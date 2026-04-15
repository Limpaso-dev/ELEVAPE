import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const { cart } = useCart();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    // window.location.reload();
  };

  // helper for active link
  const linkStyle = (path) =>
    `relative pb-1 transition ${
      location.pathname === path ? "text-white" : "text-gray-300"
    }`;

  const underline = (path) =>
    location.pathname === path && (
      <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white rounded-full"></span>
    );

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-lg shadow-lg"
          : "bg-black/50 backdrop-blur-md"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-16 py-4 text-white">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src="/images/Elevape logo.png"
            alt="Elevape Logo"
            className="h-9 w-auto object-contain group-hover:scale-105 transition"
          />
          <span className="text-lg md:text-xl font-semibold tracking-wide group-hover:text-gray-300 transition">
            Elevape
          </span>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-8 items-center text-sm font-medium">

          <Link to="/" className={linkStyle("/")}>
            Home
            {underline("/")}
          </Link>

          <Link to="/products" className={linkStyle("/products")}>
            Products
            {underline("/products")}
          </Link>

          {user && !user.isAdmin && (
            <>
              <Link to="/cart" className={linkStyle("/cart")}>
                Cart
                {underline("/cart")}
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-white text-black text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
                    {cart.length}
                  </span>
                )}
              </Link>

              <Link to="/orders" className={linkStyle("/orders")}>
                Orders
                {underline("/orders")}
              </Link>
            </>
          )}

          {user?.isAdmin && (
            <Link to="/admin" className={linkStyle("/admin")}>
              Admin
              {underline("/admin")}
            </Link>
          )}

          {user ? (
            <button
              onClick={logout}
              className="bg-white text-black px-4 py-1.5 rounded-lg hover:bg-gray-200 transition font-medium"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className={linkStyle("/login")}>
                Login
                {underline("/login")}
              </Link>

              <Link
                to="/register"
                className="bg-white text-black px-4 py-1.5 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-black/95 backdrop-blur-lg px-6 pb-6 flex flex-col gap-4 text-white text-sm">

          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setOpen(false)}>Products</Link>

          {user && !user.isAdmin && (
            <>
              <Link to="/cart" onClick={() => setOpen(false)}>
                Cart ({cart.length})
              </Link>
              <Link to="/orders" onClick={() => setOpen(false)}>
                Orders
              </Link>
            </>
          )}

          {user?.isAdmin && (
            <Link to="/admin" onClick={() => setOpen(false)}>
              Admin
            </Link>
          )}

          {user ? (
            <button
              onClick={logout}
              className="bg-white text-black px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="bg-white text-black px-4 py-2 rounded-lg text-center"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}