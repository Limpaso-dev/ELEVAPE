const router = require("express").Router();
const mongoose = require("mongoose");
const Order = require("../models/Order");
const auth = require("../middleware/auth");
const axios = require("axios");

const ORDER_STATUSES = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

// ================= GET ORDERS =================
router.get("/", auth, async (req, res) => {
  try {
    const query = req.user.isAdmin ? {} : { userId: req.user.id };
    const orders = await Order.find(query).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json("Failed to fetch orders");
  }
});

// ================= CREATE ORDER + PAYSTACK =================
router.post("/", auth, async (req, res) => {
  let order;

  try {
    const { items, subtotal, shipping, total, shippingAddress } = req.body;
    const customerEmail = req.user.email || shippingAddress?.email;

    if (!customerEmail) {
      return res.status(400).json("Email is required");
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return res.status(500).json("Paystack key not configured");
    }

    if (!process.env.FRONTEND_URL) {
      return res.status(500).json("Frontend URL not configured");
    }

    console.log("PAYSTACK INIT:", {
      email: customerEmail,
      total,
      callback: `${process.env.FRONTEND_URL}/payment-success`,
    });

    const orderId = new mongoose.Types.ObjectId();

    order = await Order.create({
      _id: orderId,
      userId: req.user.id,
      items,
      subtotal,
      shipping,
      total,
      shippingAddress,
      status: "pending",
      paymentStatus: "unpaid",
    });

    const paystackRes = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: customerEmail,
        amount: Math.round(total * 100),
        callback_url: `${process.env.FRONTEND_URL}/payment-success`,
        metadata: {
          orderId: orderId.toString(),
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paymentLink = paystackRes.data?.data?.authorization_url;

    if (!paymentLink) {
      throw new Error("Failed to generate payment link");
    }

    res.json({
      order,
      paymentLink,
    });
  } catch (err) {
    if (order?._id) {
      try {
        await Order.findByIdAndDelete(order._id);
      } catch (cleanupErr) {
        console.error("ORDER CLEANUP ERROR:", cleanupErr.message);
      }
    }

    console.error("PAYSTACK ERROR:", err.response?.data || err.message);

    res.status(500).json(
      err.response?.data?.message ||
        err.message ||
        "Payment initialization failed"
    );
  }
});

// ================= CANCEL ORDER =================
router.put("/cancel/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json("Order not found");
    }

    if (!req.user.isAdmin && order.userId !== req.user.id) {
      return res.status(403).json("Not authorized to cancel this order");
    }

    if (order.status !== "pending") {
      return res.status(400).json("Only pending orders can be cancelled");
    }

    order.status = "cancelled";
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json("Failed to cancel order");
  }
});

// ================= UPDATE ORDER STATUS =================
router.put("/status/:id", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json("Not admin");
    }

    const { status } = req.body;

    if (!ORDER_STATUSES.includes(status)) {
      return res.status(400).json("Invalid order status");
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json("Order not found");
    }

    res.json(order);
  } catch (err) {
    res.status(500).json("Failed to update order status");
  }
});

// ================= VERIFY PAYMENT =================
router.get("/verify/:reference", auth, async (req, res) => {
  try {
    const reference = req.params.reference;

    if (!reference) {
      return res.status(400).json("Reference missing");
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return res.status(500).json("Paystack key not configured");
    }

    const verifyRes = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = verifyRes.data.data;
    const orderId = data.metadata?.orderId;

    if (orderId) {
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json("Order not found");
      }

      if (!req.user.isAdmin && order.userId !== req.user.id) {
        return res.status(403).json("Not authorized to verify this order");
      }

      if (data.status === "success") {
        order.paymentStatus = "paid";
        order.paymentReference = reference;
        order.status = "processing";
        await order.save();
      }
    }

    res.json(verifyRes.data);
  } catch (err) {
    console.error("VERIFY ERROR:", err.response?.data || err.message);

    res.status(500).json(
      err.response?.data?.message || "Verification failed"
    );
  }
});

module.exports = router;
