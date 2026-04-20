const router = require("express").Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ================= UPLOAD PATH (🔥 FIXED) =================
const uploadDir = path.resolve(__dirname, "../uploads");

// ensure folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ================= MULTER CONFIG =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // ✅ absolute path
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// optional: restrict to images only
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files allowed"), false);
    }
  },
});

// ================= GET ALL PRODUCTS =================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// ================= ADD PRODUCT =================
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

      // 🔥 correct path saved
      image: `/uploads/${req.file.filename}`,

      inStock: req.body.inStock !== "false",
    });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

// ================= UPDATE STOCK =================
router.put("/:id/stock", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json("Not admin");
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { inStock: req.body.inStock },
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

// ================= DELETE PRODUCT =================
router.delete("/:id", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json("Not admin");
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json("Product not found");
    }

    // 🔥 FIXED FILE DELETE PATH
    if (product.image) {
      const filePath = path.resolve(
        __dirname,
        "..",
        product.image.replace("/uploads/", "uploads/")
      );

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