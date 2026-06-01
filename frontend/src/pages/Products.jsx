import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { API } from "../services/api";
import { formatUSD } from "../utils/currency";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`${API}/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err);
        setError("We couldn't load furniture items right now.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return navigate("/login");
    addToCart(product);
  };

  const inStockCount = products.filter((product) => product.inStock).length;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 sm:space-y-10">
      <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(255,140,66,0.22),_transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-5 py-6 sm:px-8 sm:py-8">
        <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-24 w-24 rounded-full bg-secondary/20 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent/80">
              Curated Collection
            </p>
            <div className="space-y-2">
              <h1 className="text-2xl font-black tracking-tight text-white sm:text-4xl">
                Explore Premium Furniture Collections
              </h1>
              <p className="max-w-xl text-sm leading-6 text-gray-300 sm:text-base">
                Browse modern furniture pieces, explore available styles, and
                add your favorites to your space in just a few clicks.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400">
                Total Products
              </p>
              <p className="mt-2 text-2xl font-bold text-white">
                {loading ? "--" : products.length}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400">
                Ready To Order
              </p>
              <p className="mt-2 text-2xl font-bold text-white">
                {loading ? "--" : inStockCount}
              </p>
            </div>
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-3 sm:p-4"
            >
              <div className="h-36 animate-pulse rounded-xl bg-white/8 sm:h-44" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-3/4 animate-pulse rounded bg-white/8" />
                <div className="h-3 w-full animate-pulse rounded bg-white/8" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-white/8" />
                <div className="h-10 animate-pulse rounded-xl bg-white/8" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-[24px] border border-white/10 bg-white/[0.03] px-6 py-10 text-center">
          <h2 className="text-xl font-semibold text-white">No furniture items yet</h2>
          <p className="mt-2 text-sm text-gray-400">
            Once items are added from the admin dashboard, they will appear
            here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => {
            const hasDiscount =
              p.compareAtPrice &&
              Number(p.compareAtPrice) > Number(p.price);

            const discountPercent = hasDiscount
              ? Math.round(
                  ((p.compareAtPrice - p.price) / p.compareAtPrice) * 100
                )
              : 0;

            return (
              <article
                key={p._id}
                className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-3 shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_24px_60px_rgba(0,0,0,0.28)] sm:p-4"
              >
                <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),rgba(255,255,255,0.02))] p-3 sm:h-44">
                  <span
                    className={`absolute left-2 top-2 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-[11px] ${
                      p.inStock
                        ? "bg-emerald-500/90 text-white"
                        : "bg-red-500/90 text-white"
                    }`}
                  >
                    {p.inStock ? "In Stock" : "Out of Stock"}
                  </span>

                  {hasDiscount && (
                    <span className="absolute right-2 top-2 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-black sm:text-[11px]">
                      Save {discountPercent}%
                    </span>
                  )}

                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full object-contain transition duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/200";
                    }}
                  />
                </div>

                <div className="mt-4 flex flex-1 flex-col">
                  <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-white sm:text-base">
                      {p.name}
                    </h2>

                    <p className="min-h-[2.5rem] text-xs leading-5 text-gray-400 sm:text-sm">
                      {p.description || "Premium furniture piece"}
                    </p>
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-2">
                    <div className="flex flex-col">
                      <p className="text-lg font-black text-accent sm:text-xl">
                        {formatUSD(p.price)}
                      </p>
                      {hasDiscount && (
                        <p className="text-xs text-gray-500 line-through sm:text-sm">
                          {formatUSD(p.compareAtPrice)}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(p)}
                      disabled={!p.inStock}
                      className={`rounded-xl px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                        p.inStock
                          ? "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90"
                          : "bg-white/10 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {p.inStock ? "Add to Cart" : "Unavailable"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
