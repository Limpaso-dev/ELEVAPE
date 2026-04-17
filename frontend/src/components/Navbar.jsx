import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const { totalItems } = useCart();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black py-2 shadow-md" : "bg-black py-3"
      }`}
    >
      {/* TOP */}
      <div className="flex justify-between items-center px-3 md:px-16 text-white">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src="/images/Elevape logo.png" className="h-6 md:h-8" />
          <span className="text-sm md:text-lg font-semibold">
            Elevape
          </span>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>

          {user && !user.isAdmin && (
            <>
              <Link to="/cart">Cart ({totalItems})</Link>
              <Link to="/orders">Orders</Link>
            </>
          )}

          {user?.isAdmin && <Link to="/admin">Admin</Link>}

          {user ? (
            <button
              onClick={logout}
              className="bg-white text-black px-3 py-1 rounded"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-lg"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 h-screen w-[70%] max-w-[260px] bg-black z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 text-white">

          {/* CLOSE */}
          <div className="flex justify-end mb-4">
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* LINKS */}
          <div className="flex flex-col gap-3 text-sm">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setOpen(false)}>Products</Link>

            {user && !user.isAdmin && (
              <>
                <Link to="/cart" onClick={() => setOpen(false)}>
                  Cart ({totalItems})
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
          </div>

          {/* ACTION */}
          <div className="mt-5">
            {user ? (
              <button
                onClick={logout}
                className="w-full bg-white text-black px-3 py-2 rounded text-sm"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block text-center"
              >
                Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}