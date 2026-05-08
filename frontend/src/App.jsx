import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import ScrollToTop from "./components/ScrollToTop";
import CartProvider from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";

// 🔥 LAYOUT
import MainLayout from "./components/MainLayout";

// PAGES
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import MyOrders from "./pages/MyOrders";
import Checkout from "./pages/Checkout";
import AgeGate from "./pages/AgeGate";
import PaymentSuccess from "./pages/PaymentSuccess";

// 🔐 AUTH
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// 📄 FOOTER PAGES
import Refund from "./pages/Refund";
import Shipping from "./pages/Shipping";
import PaymentMethods from "./pages/PaymentMethods";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import DeliveryLocations from "./pages/DeliveryLocations";

function AppContent() {
  const [ageVerified, setAgeVerified] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ageVerified");
    if (saved === "true") setAgeVerified(true);
  }, []);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!ageVerified) {
    return <AgeGate onVerify={() => setAgeVerified(true)} />;
  }

  return (
    <Routes>

      {/* 🔥 MAIN LAYOUT WRAPPER */}
      <Route element={<MainLayout />}>

        {/* 🌍 PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 💳 PAYMENT */}
        <Route path="/payment-success" element={<PaymentSuccess />} />

        {/* 🔐 AUTH */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* 📄 FOOTER PAGES */}
        <Route path="/support" element={<Refund />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/payment" element={<PaymentMethods />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/delivery-locations" element={<DeliveryLocations />} />

        {/* 🛒 USER */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              {!user?.isAdmin ? <Cart /> : <Home />}
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              {!user?.isAdmin ? <Checkout /> : <Home />}
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              {!user?.isAdmin ? <MyOrders /> : <Home />}
            </ProtectedRoute>
          }
        />

        {/* 👑 ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <Admin />
            </ProtectedRoute>
          }
        />

      </Route>
    </Routes>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;