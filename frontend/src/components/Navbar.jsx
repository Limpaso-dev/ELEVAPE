import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

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

  // ACTIVE LINK STYLE
  const navLink = (path) =>
    `relative font-semibold text-sm sm:text-base transition ${
      location.pathname === path
        ? "text-white after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-white"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black py-2 shadow-md" : "bg-black py-3"
      }`}
    >
      {/* TOP */}
      <div className="w-full max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-6 md:px-10 text-white">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src="/images/Elevape logo.png" className="h-6 sm:h-7 md:h-8" />
          <span className="text-base sm:text-lg md:text-xl font-bold">
            Elevape
          </span>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">

          <Link to="/" className={navLink("/")}>Home</Link>
          <Link to="/products" className={navLink("/products")}>Products</Link>

          {user && !user.isAdmin && (
            <>
              <Link to="/orders" className={navLink("/orders")}>
                Orders
              </Link>
            </>
          )}

          {user?.isAdmin && (
            <Link to="/admin" className={navLink("/admin")}>
              Admin
            </Link>
          )}

          {user ? (
            <button
              onClick={logout}
              className="bg-white text-black px-3 py-1 rounded text-sm font-semibold"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className={navLink("/login")}>
              Login
            </Link>
          )}
        </div>

        {/* RIGHT SIDE (MOBILE + CART) */}
        <div className="flex items-center gap-3">

          {/* 🛒 CART ICON */}
          {user && !user.isAdmin && (
            <div
              onClick={() => navigate("/cart")}
              className="relative cursor-pointer"
            >
              <ShoppingCart size={22} />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-xl"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>

        </div>
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
        className={`fixed top-0 right-0 h-80 w-[75%] max-w-[220px] bg-black z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 text-white flex flex-col h-full">

          {/* CLOSE */}
          <div className="flex justify-end mb-6">
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* LINKS */}
          <div className="flex flex-col gap-4 text-base font-semibold">

            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setOpen(false)}>Products</Link>

            {user && !user.isAdmin && (
              <Link to="/orders" onClick={() => setOpen(false)}>
                Orders
              </Link>
            )}

            {user?.isAdmin && (
              <Link to="/admin" onClick={() => setOpen(false)}>
                Admin
              </Link>
            )}
          </div>

          {/* ACTION */}
          <div className="mt-auto">
            {user ? (
              <button
                onClick={logout}
                className="w-full bg-white text-black px-3 py-2 rounded text-sm font-semibold"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block text-center font-semibold"
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