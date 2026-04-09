const router = require("express").Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 📦 Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// 📥 GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// 📤 ADD PRODUCT (WITH IMAGE)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json("Not admin");
    }

    if (!req.file) {
      return res.status(400).json("Image is required");
    }

    const product = await Product.create({
      name: req.body.name,
      price: Number(req.body.price),

      compareAtPrice: req.body.compareAtPrice
        ? Number(req.body.compareAtPrice)
        : null,

      description: req.body.description,
      image: `/uploads/${req.file.filename}`,

      // ✅ STOCK CONTROL
      inStock: req.body.inStock !== "false",
    });

    res.json(product);
  } catch (err) {
    res.status(500).json(err.message);
  }
});


// ✏️ UPDATE PRODUCT STOCK (🔥 IMPORTANT FEATURE)
router.put("/:id/stock", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json("Not admin");
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        inStock: req.body.inStock,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json("Product not found");
    }

    res.json(product);
  } catch (err) {
    res.status(500).json(err.message);
  }
});


// ❌ DELETE PRODUCT (AND IMAGE FILE)
router.delete("/:id", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json("Not admin");
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json("Product not found");
    }

    // 🗑️ delete image file
    if (product.image) {
      const filePath = path.join(__dirname, "..", product.image);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json("Product deleted successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;