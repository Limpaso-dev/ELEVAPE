import { useEffect, useState } from "react";
import { API } from "../services/api";
import { formatUSD } from "../utils/currency";
import BackButton from "../components/BackButton";

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
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchOrders = async () => {
    try {
      if (!token) return;

      setLoadingOrders(true);
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
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const addProduct = async () => {
    try {
      if (!token) return alert("Please login first");
      if (!product.image) return alert("Select image");

      setSubmitting(true);

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

      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setPreview(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProduct = async (id) => {
    const res = await fetch(`${API}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const data = await res.json();
      return alert(data || "Failed to delete product");
    }

    fetchProducts();
  };

  const toggleStock = async (id, currentStock) => {
    const res = await fetch(`${API}/products/${id}/stock`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ inStock: !currentStock }),
    });

    if (!res.ok) {
      const data = await res.json();
      return alert(data || "Failed to update stock");
    }

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

  const inStockCount = products.filter((item) => item.inStock).length;
  const pendingOrders = orders.filter((order) =>
    ["pending", "processing"].includes(order.status)
  ).length;

  const getStatusClasses = (status) => {
    if (status === "pending") return "bg-yellow-500/20 text-yellow-300";
    if (status === "processing") return "bg-indigo-500/20 text-indigo-300";
    if (status === "shipped") return "bg-blue-500/20 text-blue-300";
    if (status === "delivered") return "bg-emerald-500/20 text-emerald-300";
    if (status === "cancelled") return "bg-red-500/20 text-red-300";
    return "bg-white/10 text-gray-300";
  };

  return (
    <div className="w-full space-y-8 sm:space-y-10">
      <BackButton />

      <section className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(138,43,226,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(0,207,255,0.18),_transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] px-5 py-6 sm:px-8 sm:py-8">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-secondary/15 blur-3xl" />

        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_360px] lg:items-end">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Admin Control
            </p>
            <h1 className="text-2xl font-black text-white sm:text-4xl">
              Manage products, stock, and orders in one place.
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-gray-300 sm:text-base">
              Keep your catalog fresh, monitor stock quickly, and move orders
              through fulfillment without leaving the dashboard.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400">
                Products
              </p>
              <p className="mt-2 text-2xl font-bold text-white">
                {loadingProducts ? "--" : products.length}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400">
                In Stock
              </p>
              <p className="mt-2 text-2xl font-bold text-white">
                {loadingProducts ? "--" : inStockCount}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400">
                Orders
              </p>
              <p className="mt-2 text-2xl font-bold text-white">
                {loadingOrders ? "--" : orders.length}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400">
                Active Queue
              </p>
              <p className="mt-2 text-2xl font-bold text-white">
                {loadingOrders ? "--" : pendingOrders}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_360px]">
        <div className="glass border border-white/10 p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">
                New Product
              </p>
              <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                Add to the catalog
              </h2>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
              Cloudinary upload
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              value={product.name}
              placeholder="Product Name"
              className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none transition focus:border-accent/50"
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />

            <input
              value={product.price}
              placeholder="Price ($)"
              type="number"
              className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none transition focus:border-accent/50"
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
            />

            <input
              value={product.compareAtPrice}
              placeholder="Compare at price"
              type="number"
              className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none transition focus:border-accent/50"
              onChange={(e) =>
                setProduct({ ...product, compareAtPrice: e.target.value })
              }
            />

            <label className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-white/15 bg-black/20 p-3 text-sm text-gray-300 transition hover:bg-black/30">
              <input type="file" className="hidden" onChange={handleImage} />
              {product.image ? product.image.name : "Choose product image"}
            </label>
          </div>

          <textarea
            value={product.description}
            placeholder="Description"
            className="mt-4 min-h-[120px] w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white outline-none transition focus:border-accent/50"
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-3 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={product.inStock}
                className="h-4 w-4 accent-accent"
                onChange={(e) =>
                  setProduct({ ...product, inStock: e.target.checked })
                }
              />
              Mark product as in stock
            </label>

            <button
              onClick={addProduct}
              disabled={submitting}
              className={`rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
                submitting
                  ? "cursor-not-allowed bg-white/10 text-gray-400"
                  : "bg-gradient-to-r from-primary to-secondary hover:scale-[1.01] hover:opacity-95"
              }`}
            >
              {submitting ? "Adding product..." : "Add Product"}
            </button>
          </div>
        </div>

        <aside className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">
            Live Preview
          </p>
          <div className="mt-4 rounded-[24px] border border-white/10 bg-black/20 p-4">
            <div className="flex h-56 items-center justify-center rounded-2xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),rgba(255,255,255,0.02))] p-4">
              {preview ? (
                <img
                  src={preview}
                  alt="Product preview"
                  className="max-h-full object-contain"
                />
              ) : (
                <div className="text-center text-sm text-gray-500">
                  Upload an image to preview it here.
                </div>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold text-white">
                {product.name || "Product name"}
              </h3>
              <p className="text-sm text-gray-400">
                {product.description || "Product description preview"}
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xl font-bold text-accent">
                  {formatUSD(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatUSD(product.compareAtPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">
              Inventory
            </p>
            <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
              Product catalog
            </h2>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
            {loadingProducts ? "Loading..." : `${products.length} items`}
          </div>
        </div>

        {loadingProducts ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4"
              >
                <div className="h-32 animate-pulse rounded-2xl bg-white/8" />
                <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-white/8" />
                <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-white/8" />
                <div className="mt-4 h-9 animate-pulse rounded-xl bg-white/8" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] px-6 py-10 text-center text-sm text-gray-400">
            No products yet. Add your first item above.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((p) => (
              <article
                key={p._id}
                className="rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
              >
                <div className="relative flex h-36 items-center justify-center rounded-2xl bg-black/25 p-4">
                  <span
                    className={`absolute left-2 top-2 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      p.inStock
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {p.inStock ? "In Stock" : "Out of Stock"}
                  </span>

                  <img
                    src={p.image}
                    className="h-full object-contain"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-white">{p.name}</p>
                    <div className="text-right">
                      <p className="font-bold text-accent">{formatUSD(p.price)}</p>
                      {p.compareAtPrice && (
                        <p className="text-xs text-gray-500 line-through">
                          {formatUSD(p.compareAtPrice)}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="min-h-[40px] text-sm text-gray-400">
                    {p.description || "No description yet."}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => toggleStock(p._id, p.inStock)}
                    className="rounded-xl bg-yellow-500/15 px-3 py-2 text-xs font-semibold text-yellow-300 transition hover:bg-yellow-500/25"
                  >
                    Toggle Stock
                  </button>

                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="rounded-xl bg-red-500/15 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/25"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">
              Fulfillment
            </p>
            <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
              Recent orders
            </h2>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
            {loadingOrders ? "Loading..." : `${orders.length} orders`}
          </div>
        </div>

        {loadingOrders ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5"
              >
                <div className="h-4 w-1/3 animate-pulse rounded bg-white/8" />
                <div className="mt-3 h-3 w-1/2 animate-pulse rounded bg-white/8" />
                <div className="mt-4 h-16 animate-pulse rounded-2xl bg-white/8" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] px-6 py-10 text-center text-sm text-gray-400">
            No orders yet.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <article
                key={o._id}
                className="rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                      Order ID
                    </p>
                    <p className="break-all text-sm text-white">{o._id}</p>
                    <p className="text-sm text-gray-300">
                      Customer: {o.shippingAddress?.firstName}{" "}
                      {o.shippingAddress?.lastName}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                        o.status
                      )}`}
                    >
                      {o.status}
                    </span>
                    <span className="text-base font-bold text-accent">
                      {formatUSD(o.total)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
                  <div className="rounded-2xl bg-black/20 p-4 text-sm text-gray-300">
                    <p>{o.shippingAddress?.address}</p>
                    <p>
                      {o.shippingAddress?.suburb}, {o.shippingAddress?.state}
                    </p>
                    <p>{o.shippingAddress?.phone}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:self-end">
                    <button
                      onClick={() => updateStatus(o._id, "shipped")}
                      className="rounded-xl bg-blue-500/15 px-3 py-2 text-xs font-semibold text-blue-300 transition hover:bg-blue-500/25"
                    >
                      Mark Shipped
                    </button>

                    <button
                      onClick={() => updateStatus(o._id, "delivered")}
                      className="rounded-xl bg-emerald-500/15 px-3 py-2 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/25"
                    >
                      Mark Delivered
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Admin;
