import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-transparent via-gray-900 to-black text-white">

      <div className="px-6 md:px-16 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold">Elevape</h2>
          <p className="mt-3 text-gray-400 text-sm">
            Premium vaping products designed to elevate your experience.
            Quality, reliability, and fast delivery across Australia.
          </p>
        </div>

        {/* CUSTOMER SUPPORT */}
        <div>
          <h3 className="font-semibold mb-3">Customer Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/support" className="hover:text-white">Customer Support</Link></li>
            <li><Link to="/shipping" className="hover:text-white">Shipping Policy</Link></li>
            <li><Link to="/payment" className="hover:text-white">Payment Methods</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
            <li><Link to="/delivery" className="hover:text-white">Delivery Locations</Link></li>
          </ul>
        </div>

        {/* SHOP */}
        <div>
          <h3 className="font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/checkout" className="hover:text-white">Checkout</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/products" className="hover:text-white">Shop Products</Link></li>
          </ul>
        </div>

        {/* ACCOUNT */}
        <div>
          <h3 className="font-semibold mb-3">Account</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/account" className="hover:text-white">Account</Link></li>
            <li><Link to="/orders" className="hover:text-white">Orders</Link></li>
            <li><Link to="/forgot-password" className="hover:text-white">Lost Password</Link></li>
            <li><Link to="/register" className="hover:text-white">Signup</Link></li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Elevape. All rights reserved.
      </div>
    </footer>
  );
}