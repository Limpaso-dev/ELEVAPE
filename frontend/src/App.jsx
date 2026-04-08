import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import MyOrders from "./pages/MyOrders";
import Checkout from "./pages/Checkout";
import AgeGate from "./pages/AgeGate";

import CartProvider from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const [ageVerified, setAgeVerified] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ageVerified");
    if (saved === "true") setAgeVerified(true);
  }, []);

  // 🔞 SHOW AGE GATE FIRST
  if (!ageVerified) {
    return <AgeGate onVerify={() => setAgeVerified(true)} />;
  }

  return (
    <div className="min-h-screen bg-dark text-white flex flex-col">
      <Navbar />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* USER */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                {!JSON.parse(localStorage.getItem("user"))?.isAdmin ? (
                  <Cart />
                ) : (
                  <Home />
                )}
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                {!JSON.parse(localStorage.getItem("user"))?.isAdmin ? (
                  <Checkout />
                ) : (
                  <Home />
                )}
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                {!JSON.parse(localStorage.getItem("user"))?.isAdmin ? (
                  <MyOrders />
                ) : (
                  <Home />
                )}
              </ProtectedRoute>
            }
          />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;