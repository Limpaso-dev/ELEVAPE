import { useEffect, useState } from "react";
import { API, BASE_URL } from "../services/api";

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

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      if (!token) return;

      const res = await fetch(`${API}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return;

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
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

  const addProduct = async () => {
    try {
      if (!product.image) return alert("Select image");

      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", Number(product.price));
      formData.append("compareAtPrice", product.compareAtPrice || "");
      formData.append("description", product.description);
      formData.append("image", product.image);
      formData.append("inStock", product.inStock);

      const res = await fetch(`${API}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        return alert(err);
      }

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
    }
  };

  const deleteProduct = async (id) => {
    await fetch(`${API}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchProducts();
  };

  const toggleStock = async (id, currentStock) => {
    await fetch(`${API}/products/${id}/stock`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ inStock: !currentStock }),
    });

    fetchProducts();
  };

  const updateStatus = async (id, status) => {
    const res = await fetch(`${API}/orders/status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      const data = await res.json();
      return alert(data);
    }

    fetchOrders();
  };

  return (
    <div className="w-full space-y-10">

      {/* TITLE */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
        Admin Dashboard
      </h1>

      {/* ================= ADD PRODUCT ================= */}
      <div className="glass p-4 sm:p-6 max-w-xl">
        <h2 className="text-lg sm:text-xl mb-4">Add Product</h2>

        <div className="space-y-3">
          <input
            value={product.name}
            placeholder="Product Name"
            className="w-full p-2 sm:p-3 bg-black/40 rounded"
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
          />

          <input
            value={product.price}
            placeholder="Price ($)"
            type="number"
            className="w-full p-2 sm:p-3 bg-black/40 rounded"
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
          />

          <input
            value={product.compareAtPrice}
            placeholder="Compare at price"
            type="number"
            className="w-full p-2 sm:p-3 bg-black/40 rounded"
            onChange={(e) =>
              setProduct({
                ...product,
                compareAtPrice: e.target.value,
              })
            }
          />

          <input type="file" onChange={handleImage} />

          {preview && (
            <img src={preview} className="h-24 sm:h-32 mx-auto" />
          )}

          <textarea
            value={product.description}
            placeholder="Description"
            className="w-full p-2 sm:p-3 bg-black/40 rounded"
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
            className="w-full bg-gradient-to-r from-primary to-secondary p-2 sm:p-3 rounded font-semibold"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* ================= PRODUCTS ================= */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p._id} className="glass p-4 rounded-xl space-y-2">
              <img
                src={`${BASE_URL}${p.image}`}
                className="h-28 mx-auto object-contain"
              />

              <p className="font-semibold">{p.name}</p>
              <p>${p.price}</p>

              <p
                className={`text-xs ${
                  p.inStock ? "text-green-400" : "text-red-400"
                }`}
              >
                {p.inStock ? "In Stock" : "Out of Stock"}
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => toggleStock(p._id, p.inStock)}
                  className="bg-yellow-500 px-2 py-1 rounded text-xs"
                >
                  Toggle
                </button>

                <button
                  onClick={() => deleteProduct(p._id)}
                  className="bg-red-500 px-2 py-1 rounded text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= ORDERS (FIXED) ================= */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">Orders</h2>

        {orders.length === 0 ? (
          <p className="text-gray-400 text-sm">No orders yet</p>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o._id} className="glass p-4 rounded-xl space-y-2">

                <p className="text-xs break-all">
                  Order ID: {o._id}
                </p>

                <p>Total: ${o.total}</p>

                <p className="capitalize text-sm">
                  Status: {o.status}
                </p>

                <div className="text-xs bg-black/30 p-2 rounded space-y-1">
                  <p>
                    {o.shippingAddress?.firstName}{" "}
                    {o.shippingAddress?.lastName}
                  </p>
                  <p>{o.shippingAddress?.address}</p>
                  <p>
                    {o.shippingAddress?.suburb},{" "}
                    {o.shippingAddress?.state}
                  </p>
                  <p>{o.shippingAddress?.phone}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateStatus(o._id, "shipped")}
                    className="bg-blue-500 px-2 py-1 rounded text-xs"
                  >
                    Ship
                  </button>

                  <button
                    onClick={() => updateStatus(o._id, "delivered")}
                    className="bg-green-500 px-2 py-1 rounded text-xs"
                  >
                    Deliver
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Admin;