import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import CartProvider from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MyOrders from "./pages/MyOrders";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-dark text-white flex flex-col">
          
          {/* NAVBAR */}
          <Navbar />

          {/* MAIN CONTENT */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* USER ROUTES */}
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
                path="/checkout" // ✅ NEW ROUTE
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

          {/* FOOTER */}
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;