const router = require("express").Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");
const axios = require("axios");

// ➕ CREATE ORDER + INITIATE PAYMENT
router.post("/", auth, async (req, res) => {
  try {
    const { items, total, shippingAddress } = req.body;

    // ✅ Create order first
    const order = await Order.create({
      userId: req.user.id,
      items,
      total,
      shippingAddress,
      status: "pending",
    });

    // 🔥 Create Flutterwave payment
    const flwRes = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref: "order-" + order._id,
        amount: total,
        currency: "AUD",
        redirect_url: "http://localhost:5173/payment-success",
        customer: {
          email: req.user.email,
          name: req.user.name || "Customer",
        },
        customizations: {
          title: "Your Store",
          description: "Payment for your order",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      message: "Order created",
      order,
      paymentLink: flwRes.data.data.link, // ✅ REAL PAYMENT LINK
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json("Payment initialization failed");
  }
});

// 📦 GET ORDERS
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const orders = await Order.find().sort({ createdAt: -1 });
      return res.json(orders);
    } else {
      const orders = await Order.find({ userId: req.user.id }).sort({
        createdAt: -1,
      });
      return res.json(orders);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// 🔄 UPDATE ORDER STATUS (ADMIN ONLY)
router.put("/status/:id", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json("Admin only");
    }

    const { status } = req.body;
    const allowedStatuses = ["pending", "shipped", "delivered", "cancelled"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json("Invalid status");
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json("Order not found");

    order.status = status;
    await order.save();

    res.json({
      message: "Order status updated",
      order,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// ❌ CANCEL ORDER (USER ONLY)
router.put("/cancel/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json("Order not found");

    if (order.userId !== req.user.id) {
      return res.status(403).json("Not allowed");
    }

    if (order.status !== "pending") {
      return res.status(400).json("Cannot cancel this order");
    }

    order.status = "cancelled";
    await order.save();

    res.json("Order cancelled successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;