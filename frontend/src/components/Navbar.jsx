import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const { totalItems } = useCart();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
  ];

  if (user && !user.isAdmin) {
    navLinks.push({ label: "Orders", path: "/orders" });
  }

  if (user?.isAdmin) {
    navLinks.push({ label: "Admin", path: "/admin" });
  }

  const linkClass = (path) =>
    `relative rounded-full px-4 py-2 text-sm font-semibold transition ${
      location.pathname === path
        ? "bg-white/10 text-white"
        : "text-gray-300 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={`mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 text-white transition-all duration-300 sm:px-5 ${
            scrolled
              ? "border-white/12 bg-black/88 shadow-[0_16px_40px_rgba(0,0,0,0.38)] backdrop-blur-xl"
              : "border-white/10 bg-black/70 backdrop-blur-md"
          }`}
        >
          <button
            onClick={() => navigate("/")}
            className="flex min-w-0 items-center gap-3 text-left"
            aria-label="Go to homepage"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/90 via-secondary/80 to-accent/80 shadow-[0_10px_25px_rgba(138,43,226,0.25)]">
              <img
                src="/images/Elevape logo.png"
                alt="ELVARA"
                className="h-6 w-6 object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-base font-bold tracking-[0.16em] text-white">
                ELVARA
              </p>
              <p className="text-[11px] uppercase tracking-[0.24em] text-gray-400">
                Premium Footwear Store
              </p>
            </div>
          </button>

          <div className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={linkClass(link.path)}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {user && !user.isAdmin && (
              <button
                onClick={() => navigate("/cart")}
                className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                aria-label="Open cart"
              >
                <ShoppingBag size={19} />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 min-w-[20px] rounded-full bg-gradient-to-r from-primary to-secondary px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </button>
            )}

            <div className="hidden lg:block">
              {user ? (
                <button
                  onClick={logout}
                  className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-100"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
                >
                  Login
                </Link>
              )}
            </div>

            <button
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <button
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-label="Close menu overlay"
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-[86%] max-w-[340px] border-l border-white/10 bg-[#08080c] px-5 py-5 text-white shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-bold tracking-[0.16em]">ELVARA</p>
            <p className="text-[11px] uppercase tracking-[0.24em] text-gray-400">
              Premium Footwear Store
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                location.pathname === link.path
                  ? "bg-gradient-to-r from-primary/25 to-secondary/20 text-white"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user && !user.isAdmin && (
            <button
              onClick={() => navigate("/cart")}
              className="mt-2 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white"
            >
              <span>Cart</span>
              <span className="rounded-full bg-gradient-to-r from-primary to-secondary px-2 py-0.5 text-xs">
                {totalItems}
              </span>
            </button>
          )}
        </div>

        <div className="mt-auto pt-8">
          {user ? (
            <button
              onClick={logout}
              className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-gray-100"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block w-full rounded-2xl bg-gradient-to-r from-primary to-secondary px-4 py-3 text-center text-sm font-semibold text-white transition hover:opacity-95"
            >
              Login
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}