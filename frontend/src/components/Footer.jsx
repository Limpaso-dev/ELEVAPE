import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white mt-16">

      {/* TOP LINE */}
      <div className="w-full h-[1px] bg-white/10" />

      {/* CONTENT */}
      <div className="px-4 md:px-16 py-10 md:py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-lg md:text-2xl font-bold">Elevape</h2>
          <p className="mt-2 text-gray-400 text-xs md:text-sm leading-relaxed">
            Premium vaping products designed for quality, performance, and reliability.
          </p>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-400 text-sm">
            Support
          </h3>
          <ul className="space-y-1 text-xs md:text-sm text-gray-300">
            <li><Link to="/shipping" className="hover:text-white">Shipping</Link></li>
            <li><Link to="/payment" className="hover:text-white">Payments</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
          </ul>
        </div>

        {/* SHOP */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-400 text-sm">
            Shop
          </h3>
          <ul className="space-y-1 text-xs md:text-sm text-gray-300">
            <li><Link to="/products" className="hover:text-white">Products</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/checkout" className="hover:text-white">Checkout</Link></li>
          </ul>
        </div>

        {/* ACCOUNT */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-400 text-sm">
            Account
          </h3>
          <ul className="space-y-1 text-xs md:text-sm text-gray-300">
            <li><Link to="/orders" className="hover:text-white">Orders</Link></li>
            <li><Link to="/forgot-password" className="hover:text-white">Reset Password</Link></li>
            <li><Link to="/register" className="hover:text-white">Sign Up</Link></li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 text-center py-3 text-xs md:text-sm text-gray-500">
        © {new Date().getFullYear()} Elevape
      </div>
    </footer>
  );
}