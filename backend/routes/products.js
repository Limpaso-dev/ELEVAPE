const router = require("express").Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// ================= CLOUDINARY STORAGE =================
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "elevape",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

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

const requireAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json("Not admin");
  }

  next();
};

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
router.post("/", auth, requireAdmin, (req, res) => {
  upload.single("image")(req, res, async (uploadErr) => {
    if (uploadErr) {
      return res.status(400).json(uploadErr.message);
    }

    try {
      console.log("FILE DATA:", req.file);

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
        image: req.file.secure_url || req.file.path,
        imagePublicId: req.file.filename || null,
        inStock: req.body.inStock !== "false",
      });

      res.json(product);
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      res.status(500).json(err.message);
    }
  });
});

// ================= UPDATE STOCK =================
router.put("/:id/stock", auth, requireAdmin, async (req, res) => {
  try {
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
router.delete("/:id", auth, requireAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json("Product not found");
    }

    if (product.image) {
      try {
        const publicId =
          product.imagePublicId ||
          product.image.split("/").slice(-2).join("/").split(".")[0];

        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("Cloudinary delete error:", err.message);
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json("Product deleted successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
