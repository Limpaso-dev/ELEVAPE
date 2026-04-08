import { useEffect, useState } from "react";
import API from "../services/api";

function Admin() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    compareAtPrice: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");

  // 📦 Fetch products
  const fetchProducts = async () => {
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    setProducts(data);
  };

  // 📑 Fetch orders
  const fetchOrders = async () => {
    const res = await fetch(`${API}/orders`, {
      headers: { Authorization: token },
    });
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  // 🖼️ Handle image
  const handleImage = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });

    if (file) setPreview(URL.createObjectURL(file));
  };

  // ➕ Add product
  const addProduct = async () => {
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("price", Number(product.price));
    formData.append(
      "compareAtPrice",
      product.compareAtPrice ? Number(product.compareAtPrice) : ""
    );
    formData.append("description", product.description);
    formData.append("image", product.image);

    await fetch(`${API}/products`, {
      method: "POST",
      headers: { Authorization: token },
      body: formData,
    });

    setProduct({
      name: "",
      price: "",
      compareAtPrice: "",
      description: "",
      image: null,
    });

    setPreview(null);
    fetchProducts();
  };

  // ❌ Delete product
  const deleteProduct = async (id) => {
    await fetch(`${API}/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });

    fetchProducts();
  };

  // 🔄 UPDATE ORDER STATUS (FIXED)
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API}/orders/status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      console.log("Update response:", data);

      if (!res.ok) {
        alert(data);
        return;
      }

      fetchOrders(); // refresh UI
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-6 space-y-10">

      {/* HEADER */}
      <h1 className="text-3xl font-bold gradient-text">
        Admin Dashboard
      </h1>

      {/* ADD PRODUCT */}
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
            placeholder="Price (AUD)"
            type="number"
            className="w-full p-2 bg-black/40 rounded"
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
          />

          <input
            value={product.compareAtPrice}
            placeholder="Compare at price (AUD)"
            type="number"
            className="w-full p-2 bg-black/40 rounded"
            onChange={(e) =>
              setProduct({
                ...product,
                compareAtPrice: e.target.value,
              })
            }
          />

          <input
            type="file"
            className="w-full p-2 bg-black/40 rounded"
            onChange={handleImage}
          />

          {preview && (
            <img
              src={preview}
              className="h-32 mx-auto object-contain"
              alt="preview"
            />
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

          <button
            onClick={addProduct}
            className="w-full bg-gradient-to-r from-primary to-secondary p-2 rounded font-semibold"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* PRODUCTS */}
      <div>
        <h2 className="text-xl mb-4">Products</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p._id} className="glass p-4">
              <img
                src={`http://localhost:5000${p.image}`}
                className="h-32 mx-auto object-contain"
                alt={p.name}
              />

              <h3 className="mt-2 text-lg">{p.name}</h3>

              <p className="text-accent font-semibold">
                {p.price} AUD
              </p>

              <button
                onClick={() => deleteProduct(p._id)}
                className="mt-3 w-full bg-red-500 p-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ORDERS */}
      <div>
        <h2 className="text-xl mb-4">Orders</h2>

        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o._id} className="glass p-4 space-y-2">

              <p className="text-sm text-gray-300">
                Order ID: {o._id}
              </p>

              <p>Total: {o.total} AUD</p>

              {/* STATUS */}
              <p>
                Status:
                <span
                  className={`ml-2 px-2 py-1 rounded text-sm ${
                    o.status === "pending"
                      ? "bg-yellow-500"
                      : o.status === "shipped"
                      ? "bg-blue-500"
                      : o.status === "delivered"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                >
                  {o.status}
                </span>
              </p>

              {/* SHIPPING */}
              <div className="bg-black/30 p-3 rounded text-sm space-y-1">
                <p className="font-semibold">Shipping:</p>
                <p>
                  {o.shippingAddress?.firstName}{" "}
                  {o.shippingAddress?.lastName}
                </p>
                <p>{o.shippingAddress?.address}</p>
                <p>
                  {o.shippingAddress?.suburb},{" "}
                  {o.shippingAddress?.state}{" "}
                  {o.shippingAddress?.postcode}
                </p>
                <p>📞 {o.shippingAddress?.phone}</p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 mt-3">
                {o.status !== "delivered" && (
                  <>
                    <button
                      onClick={() => updateStatus(o._id, "shipped")}
                      className="bg-blue-500 px-3 py-1 rounded text-sm disabled:opacity-50"
                      disabled={o.status === "shipped"}
                    >
                      Mark Shipped
                    </button>

                    <button
                      onClick={() => updateStatus(o._id, "delivered")}
                      className="bg-green-500 px-3 py-1 rounded text-sm"
                    >
                      Mark Delivered
                    </button>
                  </>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Admin;