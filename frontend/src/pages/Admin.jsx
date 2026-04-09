import { useEffect, useState } from "react";
import API from "../services/api";

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
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    setProducts(data);
  };

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

  const handleImage = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });

    if (file) setPreview(URL.createObjectURL(file));
  };

  // ➕ ADD PRODUCT
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

    // ✅ FIXED
    formData.append("inStock", product.inStock);

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
      inStock: true,
      image: null,
    });

    setPreview(null);
    fetchProducts();
  };

  // ❌ DELETE
  const deleteProduct = async (id) => {
    await fetch(`${API}/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });

    fetchProducts();
  };

  // 🔄 TOGGLE STOCK (🔥 NEW FEATURE)
  const toggleStock = async (id, currentStock) => {
    await fetch(`${API}/products/${id}/stock`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        inStock: !currentStock,
      }),
    });

    fetchProducts();
  };

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

          {/* ✅ STOCK CHECKBOX */}
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

      {/* PRODUCTS */}
      <div>
        <h2 className="text-xl mb-4">Products</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p._id} className="glass p-4">

              <img
                src={`http://localhost:5000${p.image}`}
                className="h-32 mx-auto object-contain"
              />

              <h3 className="mt-2 text-lg">{p.name}</h3>

              <p className="text-accent font-semibold">
                {p.price} AUD
              </p>

              {/* ✅ STOCK STATUS */}
              <p
                className={`mt-1 text-sm ${
                  p.inStock ? "text-green-400" : "text-red-400"
                }`}
              >
                {p.inStock ? "In Stock" : "Out of Stock"}
              </p>

              {/* 🔄 TOGGLE STOCK */}
              <button
                onClick={() => toggleStock(p._id, p.inStock)}
                className="mt-2 w-full bg-yellow-500 p-2 rounded text-sm"
              >
                Toggle Stock
              </button>

              <button
                onClick={() => deleteProduct(p._id)}
                className="mt-2 w-full bg-red-500 p-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ORDERS (UNCHANGED) */}
      <div>
        <h2 className="text-xl mb-4">Orders</h2>

        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o._id} className="glass p-4 space-y-2">
              <p>Order ID: {o._id}</p>
              <p>Total: {o.total} AUD</p>

              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(o._id, "shipped")}
                  className="bg-blue-500 px-3 py-1 rounded text-sm"
                >
                  Ship
                </button>

                <button
                  onClick={() => updateStatus(o._id, "delivered")}
                  className="bg-green-500 px-3 py-1 rounded text-sm"
                >
                  Deliver
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