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
    <div className="pt-32 px-6 md:px-16 max-w-7xl mx-auto space-y-10">
      {/* 🔥 FIXED TITLE */}
      <h1 className="text-3xl font-bold text-white relative z-10">
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

      {/* rest unchanged... */}
    </div>
  );
}

export default Admin;