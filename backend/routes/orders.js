const router = require("express").Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");
const axios = require("axios");


// ================= CREATE ORDER + PAYSTACK =================
router.post("/", auth, async (req, res) => {
  try {
    const { items, subtotal, shipping, total, shippingAddress } = req.body;

    // 🔴 VALIDATION (FIXED)
    if (!req.user?.email && !shippingAddress?.email) {
      return res.status(400).json("Email is required");
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return res.status(500).json("Paystack key not configured");
    }

    if (!process.env.FRONTEND_URL) {
      return res.status(500).json("Frontend URL not configured");
    }

    // 🔍 DEBUG
    console.log("PAYSTACK INIT:", {
      email: req.user.email || shippingAddress.email,
      total,
      callback: `${process.env.FRONTEND_URL}/payment-success`,
    });

    // 1. Create order
    const order = await Order.create({
      userId: req.user.id,
      items,
      subtotal,
      shipping,
      total,
      shippingAddress,
      status: "pending",
      paymentStatus: "unpaid",
    });

    // 2. Initialize Paystack
    const paystackRes = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        // ✅ FINAL FIX (THIS IS THE IMPORTANT LINE)
        email: req.user.email || shippingAddress.email,

        amount: Math.round(total * 100),
        callback_url: `${process.env.FRONTEND_URL}/payment-success`,
        metadata: {
          orderId: order._id.toString(),
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
      return res.status(500).json("Failed to generate payment link");
    }

    res.json({
      order,
      paymentLink,
    });

  } catch (err) {
    console.error("PAYSTACK ERROR:", err.response?.data || err.message);

    res.status(500).json(
      err.response?.data?.message || "Payment initialization failed"
    );
  }
});


// ================= VERIFY PAYMENT =================
router.get("/verify/:reference", async (req, res) => {
  try {
    const reference = req.params.reference;

    if (!reference) {
      return res.status(400).json("Reference missing");
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

    if (data.status === "success") {
      const orderId = data.metadata?.orderId;

      if (orderId) {
        const order = await Order.findById(orderId);

        if (order) {
          order.paymentStatus = "paid";
          order.paymentReference = reference;
          order.status = "processing";
          await order.save();
        }
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