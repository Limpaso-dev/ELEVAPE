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
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black shadow-lg py-3" : "bg-black py-4"
      }`}
    >
      {/* ================= TOP ================= */}
      <div className="flex justify-between items-center px-4 md:px-16 text-white">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src="/images/Elevape logo.png" className="h-7 md:h-8" />
          <span className="text-sm md:text-lg font-semibold">Elevape</span>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:flex items-center gap-8 text-sm">

          {["/", "/products"].map((path, i) => (
            <Link key={i} to={path} className="relative group">
              <span className={isActive(path) ? "text-white" : "text-gray-300"}>
                {path === "/" ? "Home" : "Products"}
              </span>

              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${
                  isActive(path)
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}

          {user && !user.isAdmin && (
            <>
              <Link to="/cart" className="relative">
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-white text-black text-[10px] px-1.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>

              <Link to="/orders">Orders</Link>
            </>
          )}

          {user?.isAdmin && <Link to="/admin">Admin</Link>}

          {user ? (
            <button
              onClick={logout}
              className="bg-white text-black px-4 py-1.5 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link
                to="/register"
                className="bg-white text-black px-4 py-1.5 rounded-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`fixed top-0 right-0 h-screen w-[70%] max-w-[280px] bg-black z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 text-white">

          {/* CLOSE */}
          <div className="flex justify-end mb-5">
            <button
              className="text-xl"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* LINKS */}
          <div className="flex flex-col gap-4 text-sm">
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

          {/* ACTIONS */}
          <div className="mt-6">
            {user ? (
              <button
                onClick={logout}
                className="w-full bg-white text-black px-4 py-2 rounded-lg text-sm"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <Link to="/login" onClick={() => setOpen(false)}>
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="bg-white text-black px-4 py-2 rounded-lg text-center text-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}