const router = require("express").Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const order = await Order.create({
    userId: req.user.id,
    items: req.body.items,
    total: req.body.total,
  });

  res.json({
    message: "Order created",
    order,
    paymentLink: "https://api.flutterwave.com/mock-payment",
  });
});

router.get("/", auth, async (req, res) => {
  try {
    if (req.user.isAdmin) {
      // 👑 Admin → all orders
      const orders = await Order.find();
      return res.json(orders);
    } else {
      // 👤 User → only their orders
      const orders = await Order.find({ userId: req.user.id });
      return res.json(orders);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/cancel/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json("Order not found");

    // 👤 Only owner can cancel
    if (order.userId !== req.user.id) {
      return res.status(403).json("Not allowed");
    }

    // ❌ Only pending orders can be cancelled
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