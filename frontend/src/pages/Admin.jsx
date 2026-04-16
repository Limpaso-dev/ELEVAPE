import { useEffect, useState } from "react";

const BASE_URL = "https://elevape.onrender.com";

function Admin() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    compareAtPrice: "",
    description: "",
    inStock: true,
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");

  // ================= PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/products`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    }
  };

  // ================= ORDERS =================
  const fetchOrders = async () => {
    try {
      if (!token) return;

      const res = await fetch(`${BASE_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      alert("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });

    if (file) setPreview(URL.createObjectURL(file));
  };

  // ================= ADD PRODUCT =================
  const addProduct = async () => {
    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("price", Number(product.price));
      formData.append(
        "compareAtPrice",
        product.compareAtPrice ? Number(product.compareAtPrice) : ""
      );
      formData.append("description", product.description);
      formData.append("image", product.image);
      formData.append("inStock", product.inStock);

      await fetch(`${BASE_URL}/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      setProduct({
        name: "",
        price: "",
        compareAtPrice: "",
        description: "",
        inStock: true,
        image: null,
      });

      setPreview(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  // ================= DELETE PRODUCT =================
  const deleteProduct = async (id) => {
    try {
      await fetch(`${BASE_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  // ================= TOGGLE STOCK =================
  const toggleStock = async (id, currentStock) => {
    try {
      await fetch(`${BASE_URL}/api/products/${id}/stock`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          inStock: !currentStock,
        }),
      });

      fetchProducts();
    } catch (err) {
      alert("Failed to update stock");
    }
  };

  // ================= UPDATE ORDER STATUS =================
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/orders/status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        alert(data);
        return;
      }

      fetchOrders();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold gradient-text">
        Admin Dashboard
      </h1>

      {/* ================= ADD PRODUCT ================= */}
      <div className="glass p-6 max-w-xl">
        <h2 className="text-xl mb-4">Add Product</h2>

        <div className="space-y-3">
          <input
            value={product.name}
            placeholder="Product Name"
            className="w-full p-2 bg-black/40 rounded"
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
          />

          <input
            value={product.price}
            placeholder="Price ($)"
            type="number"
            className="w-full p-2 bg-black/40 rounded"
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
          />

          <input
            value={product.compareAtPrice}
            placeholder="Compare at price"
            type="number"
            className="w-full p-2 bg-black/40 rounded"
            onChange={(e) =>
              setProduct({
                ...product,
                compareAtPrice: e.target.value,
              })
            }
          />

          <input type="file" onChange={handleImage} />

          {preview && (
            <img src={preview} className="h-32 mx-auto" />
          )}

          <textarea
            value={product.description}
            placeholder="Description"
            className="w-full p-2 bg-black/40 rounded"
            onChange={(e) =>
              setProduct({
                ...product,
                description: e.target.value,
              })
            }
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={product.inStock}
              onChange={(e) =>
                setProduct({
                  ...product,
                  inStock: e.target.checked,
                })
              }
            />
            <label className="text-sm text-gray-400">
              In Stock
            </label>
          </div>

          <button
            onClick={addProduct}
            className="w-full bg-gradient-to-r from-primary to-secondary p-2 rounded font-semibold"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* ================= PRODUCTS ================= */}
      <div>
        <h2 className="text-xl mb-4">Products</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p._id} className="glass p-4">
              <img
                src={`${BASE_URL}${p.image}`}
                className="h-32 mx-auto object-contain"
              />

              <h3 className="mt-2 text-lg">{p.name}</h3>

              <p className="text-accent font-semibold">
                ${p.price}
              </p>

              <p
                className={`mt-1 text-sm ${
                  p.inStock ? "text-green-400" : "text-red-400"
                }`}
              >
                {p.inStock ? "In Stock" : "Out of Stock"}
              </p>

              <button
                onClick={() => toggleStock(p._id, p.inStock)}
                className="mt-2 w-full bg-yellow-700 p-2 rounded text-sm"
              >
                Toggle Stock
              </button>

              <button
                onClick={() => deleteProduct(p._id)}
                className="mt-2 w-full bg-red-900 p-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ================= ORDERS ================= */}
      <div>
        <h2 className="text-xl mb-4">Orders</h2>

        <div className="space-y-6">
          {orders.map((o) => (
            <div key={o._id} className="glass p-5 space-y-4">

              <div className="flex justify-between">
                <p className="text-sm text-gray-400">
                  Order ID: {o._id}
                </p>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                  {o.status}
                </span>
              </div>

              {/* CUSTOMER */}
              <div className="text-sm text-gray-300">
                <p className="font-semibold">
                  {o.shippingAddress?.firstName}{" "}
                  {o.shippingAddress?.lastName}
                </p>
                <p>{o.shippingAddress?.address}</p>
                <p>
                  {o.shippingAddress?.suburb},{" "}
                  {o.shippingAddress?.state}
                </p>
                <p>{o.shippingAddress?.postcode}</p>
                <p>📞 {o.shippingAddress?.phone}</p>
                <p>✉️ {o.shippingAddress?.email}</p>
              </div>

              {/* ITEMS */}
              <div className="border-t border-white/10 pt-2 text-sm">
                {o.items?.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* TOTALS */}
              <div className="border-t border-white/10 pt-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${o.subtotal || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${o.shipping || 0}</span>
                </div>
                <div className="flex justify-between font-bold text-accent">
                  <span>Total</span>
                  <span>${o.total}</span>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(o._id, "shipped")}
                  className="bg-blue-500 px-3 py-1 rounded text-sm"
                >
                  Shipped
                </button>

                <button
                  onClick={() => updateStatus(o._id, "delivered")}
                  className="bg-green-500 px-3 py-1 rounded text-sm"
                >
                  Delivered
                </button>

                <button
                  onClick={() => updateStatus(o._id, "cancelled")}
                  className="bg-red-500 px-3 py-1 rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;