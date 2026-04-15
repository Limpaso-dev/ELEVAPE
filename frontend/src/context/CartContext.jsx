import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

function CartProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  const [cart, setCart] = useState([]);

  // 🔁 ALWAYS SYNC USER + CART
  useEffect(() => {
    const syncUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);

      if (storedUser?._id) {
        const savedCart = localStorage.getItem(
          `cart_${storedUser._id}`
        );
        setCart(savedCart ? JSON.parse(savedCart) : []);
      } else {
        setCart([]);
      }
    };

    syncUser();

    // 🔥 LISTEN TO LOGIN/LOGOUT CHANGES
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  // 💾 SAVE CART PER USER
  useEffect(() => {
    if (user?._id) {
      localStorage.setItem(
        `cart_${user._id}`,
        JSON.stringify(cart)
      );
    }
  }, [cart, user]);

  // ➕ ADD TO CART
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item._id === product._id
      );

      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ➖ DECREASE
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ➕ INCREASE
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ❌ REMOVE
  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  // 🧹 CLEAR
  const clearCart = () => {
    setCart([]);
    if (user?._id) {
      localStorage.removeItem(`cart_${user._id}`);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;