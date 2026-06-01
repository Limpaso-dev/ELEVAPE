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

const DPO_ENDPOINT =
  process.env.DPO_ENDPOINT || "https://secure.3gdirectpay.com/API/v6/";
const DPO_PAYMENT_URL =
  process.env.DPO_PAYMENT_URL || "https://secure.3gdirectpay.com/payv2.php?ID=";
const DPO_CURRENCY = process.env.DPO_CURRENCY || "USD";

const escapeXml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const getXmlValue = (xml, tag) => {
  const match = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? match[1].trim() : "";
};

const formatDpoDate = (date = new Date()) => {
  const pad = (value) => String(value).padStart(2, "0");

  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ].join("/") + ` ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const postDpoXml = async (xml) => {
  try {
    const response = await axios.post(DPO_ENDPOINT, xml, {
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        Accept: "application/xml, text/xml, */*",
        "User-Agent": "ELEVAPE Checkout",
      },
      timeout: 30000,
    });

    return response.data;
  } catch (err) {
    const status = err.response?.status;

    if (status === 403) {
      throw new Error(
        "DPO rejected the API request with HTTP 403. Check that your DPO endpoint matches your test account and that DPO has enabled API access for this environment."
      );
    }

    if (err.code === "ENOTFOUND") {
      throw new Error(
        "DPO API hostname could not be resolved. Check DPO_ENDPOINT."
      );
    }

    throw err;
  }
};

const createDpoToken = async ({ order, customerEmail }) => {
  if (!process.env.DPO_COMPANY_TOKEN || !process.env.DPO_SERVICE_ID) {
    throw new Error("DPO credentials are not configured");
  }

  if (!process.env.FRONTEND_URL) {
    throw new Error("Frontend URL not configured");
  }

  const orderId = order._id.toString();
  const amount = Number(order.total).toFixed(2);
  const customerFirstName = order.shippingAddress?.firstName || "Customer";
  const customerLastName = order.shippingAddress?.lastName || "";
  const redirectUrl = `${process.env.FRONTEND_URL}/payment-success?orderId=${orderId}`;
  const backUrl = `${process.env.FRONTEND_URL}/checkout`;

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<API3G>
  <CompanyToken>${escapeXml(process.env.DPO_COMPANY_TOKEN)}</CompanyToken>
  <Request>createToken</Request>
  <Transaction>
    <PaymentAmount>${amount}</PaymentAmount>
    <PaymentCurrency>${escapeXml(DPO_CURRENCY)}</PaymentCurrency>
    <CompanyRef>${escapeXml(orderId)}</CompanyRef>
    <RedirectURL>${escapeXml(redirectUrl)}</RedirectURL>
    <BackURL>${escapeXml(backUrl)}</BackURL>
    <CompanyRefUnique>0</CompanyRefUnique>
    <PTL>5</PTL>
    <customerFirstName>${escapeXml(customerFirstName)}</customerFirstName>
    <customerLastName>${escapeXml(customerLastName)}</customerLastName>
    <customerEmail>${escapeXml(customerEmail)}</customerEmail>
  </Transaction>
  <Services>
    <Service>
      <ServiceType>${escapeXml(process.env.DPO_SERVICE_ID)}</ServiceType>
      <ServiceDescription>${escapeXml(`ELEVAPE order ${orderId}`)}</ServiceDescription>
      <ServiceDate>${formatDpoDate()}</ServiceDate>
    </Service>
  </Services>
</API3G>`;

  const data = await postDpoXml(xml);
  const result = getXmlValue(data, "Result");
  const explanation = getXmlValue(data, "ResultExplanation");
  const transToken = getXmlValue(data, "TransToken");
  const transRef = getXmlValue(data, "TransRef");

  if (result !== "000" || !transToken) {
    throw new Error(explanation || "Failed to create DPO payment token");
  }

  return {
    transToken,
    transRef,
    paymentLink: `${DPO_PAYMENT_URL}${encodeURIComponent(transToken)}`,
  };
};

const verifyDpoToken = async (transactionToken) => {
  if (!process.env.DPO_COMPANY_TOKEN) {
    throw new Error("DPO credentials are not configured");
  }

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<API3G>
  <CompanyToken>${escapeXml(process.env.DPO_COMPANY_TOKEN)}</CompanyToken>
  <Request>verifyToken</Request>
  <TransactionToken>${escapeXml(transactionToken)}</TransactionToken>
</API3G>`;

  const data = await postDpoXml(xml);

  return {
    raw: data,
    result: getXmlValue(data, "Result"),
    explanation: getXmlValue(data, "ResultExplanation"),
    approval: getXmlValue(data, "TransactionApproval"),
    amount: getXmlValue(data, "TransactionAmount"),
    currency: getXmlValue(data, "TransactionCurrency"),
  };
};

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

// ================= CREATE ORDER + DPO TOKEN =================
router.post("/", auth, async (req, res) => {
  let order;

  try {
    const { items, subtotal, shipping, total, shippingAddress } = req.body;
    const customerEmail = req.user.email || shippingAddress?.email;

    if (!customerEmail) {
      return res.status(400).json("Email is required");
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json("Cart is empty");
    }

    const orderId = new mongoose.Types.ObjectId();

    order = await Order.create({
      _id: orderId,
      userId: req.user.id,
      items,
      subtotal,
      shipping,
      total,
      currency: DPO_CURRENCY,
      shippingAddress,
      status: "pending",
      paymentStatus: "unpaid",
      paymentProvider: "dpo",
    });

    const dpo = await createDpoToken({ order, customerEmail });

    order.paymentReference = dpo.transToken;
    order.paymentProviderReference = dpo.transRef;
    await order.save();

    res.json({
      order,
      paymentLink: dpo.paymentLink,
    });
  } catch (err) {
    if (order?._id) {
      try {
        await Order.findByIdAndDelete(order._id);
      } catch (cleanupErr) {
        console.error("ORDER CLEANUP ERROR:", cleanupErr.message);
      }
    }

    console.error("DPO ERROR:", err.response?.data || err.message);

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

    const query = mongoose.Types.ObjectId.isValid(reference)
      ? { _id: reference }
      : { paymentReference: reference };

    const order = await Order.findOne(query);

    if (!order) {
      return res.status(404).json("Order not found");
    }

    if (!req.user.isAdmin && order.userId !== req.user.id) {
      return res.status(403).json("Not authorized to verify this order");
    }

    if (!order.paymentReference) {
      return res.status(400).json("Payment reference missing");
    }

    const verification = await verifyDpoToken(order.paymentReference);

    if (verification.result === "000") {
      order.paymentStatus = "paid";
      order.status = "processing";
      order.paymentProviderReference =
        verification.approval || order.paymentProviderReference;
      await order.save();
    }

    res.json({
      order,
      verification,
    });
  } catch (err) {
    console.error("VERIFY ERROR:", err.response?.data || err.message);

    res.status(500).json(
      err.response?.data?.message || err.message || "Verification failed"
    );
  }
});

module.exports = router;
