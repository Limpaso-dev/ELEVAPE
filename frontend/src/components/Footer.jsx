import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white mt-20 relative">

      {/* TOP GLOW LINE */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="px-6 md:px-16 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide">Elevape</h2>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed">
            Premium vaping products designed to elevate your experience.
            Quality, reliability, and fast delivery across Australia.
          </p>
        </div>

        {/* CUSTOMER SUPPORT */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-300">Customer Support</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link to="/support" className="hover:text-white transition">Customer Support</Link></li>
            <li><Link to="/shipping" className="hover:text-white transition">Shipping Policy</Link></li>
            <li><Link to="/payment" className="hover:text-white transition">Payment Methods</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
            <li><Link to="/delivery" className="hover:text-white transition">Delivery Locations</Link></li>
          </ul>
        </div>

        {/* SHOP */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-300">Shop</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link to="/checkout" className="hover:text-white transition">Checkout</Link></li>
            <li><Link to="/cart" className="hover:text-white transition">Cart</Link></li>
            <li><Link to="/products" className="hover:text-white transition">Shop Products</Link></li>
          </ul>
        </div>

        {/* ACCOUNT */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-300">Account</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link to="/account" className="hover:text-white transition">Account</Link></li>
            <li><Link to="/orders" className="hover:text-white transition">Orders</Link></li>
            <li><Link to="/forgot-password" className="hover:text-white transition">Lost Password</Link></li>
            <li><Link to="/register" className="hover:text-white transition">Signup</Link></li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Elevape. All rights reserved.
      </div>
    </footer>
  );
}