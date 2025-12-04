import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartItems } = useCart();
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow fixed top-0 left-0 w-full z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          QuickBite
        </Link>

        {/* Nav Links */}
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-gray-700 hover:text-indigo-600 transition font-medium"
          >
            Restaurants
          </Link>

          {/* Cart Button */}
          <Link
            to="/cart"
            className="relative bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition"
          >
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-indigo-600 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
