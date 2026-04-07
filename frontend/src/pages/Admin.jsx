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

  // 🖼️ Handle image + preview
  const handleImage = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ➕ Add product
  const addProduct = async () => {
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("price", Number(product.price)); // ✅ FIX
    formData.append(
      "compareAtPrice",
      product.compareAtPrice ? Number(product.compareAtPrice) : ""
    ); // ✅ FIX
    formData.append("description", product.description);
    formData.append("image", product.image);

    await fetch(`${API}/products`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    });

    // reset form
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

  return (
    <div className="p-6 space-y-8">

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

      {/* PRODUCTS LIST */}
      <div>
        <h2 className="text-xl mb-4">Products</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => {
            const price = Number(p.price);
            const compare =
              p.compareAtPrice && !isNaN(p.compareAtPrice)
                ? Number(p.compareAtPrice)
                : null;

            const hasDiscount =
              compare !== null && compare > price;

            const discountPercent = hasDiscount
              ? Math.round(((compare - price) / compare) * 100)
              : 0;

            return (
              <div key={p._id} className="glass p-4">

                <img
                  src={`http://localhost:5000${p.image}`}
                  className="h-32 mx-auto object-contain"
                  alt={p.name}
                />

                <h3 className="mt-2 text-lg">{p.name}</h3>

                <div className="flex items-center gap-2 mt-1">
                  <p className="text-accent font-semibold">
                    {price} AUD
                  </p>

                  {hasDiscount && (
                    <p className="text-gray-400 line-through text-sm">
                      {compare} AUD
                    </p>
                  )}
                </div>

                {hasDiscount && (
                  <p className="text-green-500 text-sm">
                    {discountPercent}% OFF
                  </p>
                )}

                <button
                  onClick={() => deleteProduct(p._id)}
                  className="mt-3 w-full bg-red-500 p-2 rounded"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ORDERS */}
      <div>
        <h2 className="text-xl mb-4">Orders</h2>

        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o._id} className="glass p-4">
              <p className="text-sm text-gray-300">
                Order ID: {o._id}
              </p>

              <p>Total: {o.total} AUD</p>
              <p>Status: {o.status}</p>

              <div className="mt-2 text-sm text-gray-400">
                Items: {o.items.length}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Admin;