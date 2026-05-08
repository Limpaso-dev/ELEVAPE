import { Link } from "react-router-dom";

export default function Footer() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Refund & Return Policy", path: "/refund" },
    { label: "Delivery Locations", path: "/delivery-locations" },
  ];

  const supportLinks = [
    { label: "Shipping", path: "/shipping" },
    { label: "Payment Methods", path: "/payment-methods" },
    { label: "Privacy", path: "/privacy" },
    { label: "Terms", path: "/terms" },
  ];

  const accountLinks = user?.isAdmin
    ? [{ label: "Admin Dashboard", path: "/admin" }]
    : [
        { label: "Orders", path: "/orders" },
        { label: "Cart", path: "/cart" },
        { label: "Checkout", path: "/checkout" },
      ];

  return (
    <footer className="mt-14 border-t border-white/10 bg-[#050508] text-white sm:mt-16">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:px-10 md:py-14">
        <div className="grid gap-8 rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.22)] md:grid-cols-[minmax(0,1.1fr)_repeat(3,minmax(0,0.8fr))] md:p-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/90 via-secondary/80 to-accent/80 shadow-[0_10px_25px_rgba(138,43,226,0.22)]">
                <img
                  src="/images/Elevape logo.png"
                  alt="ELEVAPE"
                  className="h-6 w-6 object-contain"
                />
              </div>
              <div>
                <p className="text-lg font-bold tracking-[0.16em] text-white">
                  ELEVAPE
                </p>
                <p className="text-[11px] uppercase tracking-[0.24em] text-gray-400">
                  Premium Furniture Store
                </p>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-6 text-gray-400">
              Premium furniture crafted for comfort, durability, and timeless
              design to elevate every living space.
            </p>

            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                Shop With Confidence
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Browse furniture collections, manage your orders, and complete
                your checkout smoothly on mobile or desktop.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-300">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link className="transition hover:text-white" to={link.path}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Support
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-300">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link className="transition hover:text-white" to={link.path}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Account
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-300">
              {accountLinks.map((link) => (
                <li key={link.path}>
                  <Link className="transition hover:text-white" to={link.path}>
                    {link.label}
                  </Link>
                </li>
              ))}
              {!user && (
                <>
                  <li>
                    <Link className="transition hover:text-white" to="/login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link className="transition hover:text-white" to="/register">
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="transition hover:text-white"
                      to="/forgot-password"
                    >
                      Reset Password
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p>&copy; {new Date().getFullYear()} ELEVAPE. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link className="transition hover:text-white" to="/privacy">
              Privacy
            </Link>
            <Link className="transition hover:text-white" to="/terms">
              Terms
            </Link>
            <Link className="transition hover:text-white" to="/refund">
              Refund & Return Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}