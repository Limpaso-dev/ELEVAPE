import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { cart } = useCart();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md shadow-md"
          : "bg-black/40 backdrop-blur-md"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-16 py-4 text-white">

        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl md:text-2xl font-bold cursor-pointer"
        >
          Elevape
        </h1>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-8 items-center">

          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/products" className="hover:text-gray-300">Products</Link>

          {user && !user.isAdmin && (
            <>
              {/* CART */}
              <div className="relative">
                <Link to="/cart" className="hover:text-gray-300">
                  Cart
                </Link>

                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-white text-black text-xs px-2 py-0.5 rounded-full">
                    {cart.length}
                  </span>
                )}
              </div>

              <Link to="/orders" className="hover:text-gray-300">
                Orders
              </Link>
            </>
          )}

          {user?.isAdmin && (
            <Link to="/admin" className="hover:text-gray-300">
              Admin
            </Link>
          )}

          {user ? (
            <button
              onClick={logout}
              className="bg-white text-black px-4 py-1.5 rounded-lg hover:bg-gray-200"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-black px-4 py-1.5 rounded-lg hover:bg-gray-200"
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
          ☰
        </button>
      </div>

      {/* MOBILE MENU (NO WHITE BACKGROUND) */}
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur-md px-6 pb-6 flex flex-col gap-4 text-white">

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
      )}
    </nav>
  );
}