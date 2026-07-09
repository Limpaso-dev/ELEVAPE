import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-full space-y-12 md:space-y-16">
      <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0a0a]">
        <img
          src="/images/fun-hero.jpg"
          alt="ELEVAPE hero"
          className="h-[54vh] w-full object-cover sm:h-[58vh] lg:h-[64vh]"
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.88),rgba(10,10,10,0.58),rgba(10,10,10,0.72))]" />

        <div className="absolute inset-0 flex items-center">
          <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="max-w-2xl space-y-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                Premium Footwear Store
              </p>

              <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
                Step into style with premium shoes designed for comfort,
                performance, and every occasion.
              </h1>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/products">
                  <button className="rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95 sm:text-base">
                    Shop Now
                  </button>
                </Link>

                <Link to="/refund">
                  <button className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:text-base">
                    Refund & Return Policy
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="flex justify-center">
        <div className="glass w-full max-w-md border border-white/10 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Featured Product
          </p>
          <h2 className="mt-3 text-2xl font-bold text-white">PRO RUNNER</h2>
          <p className="mt-1 text-sm text-gray-400">
            Performance meets style
          </p>

          <div className="mt-6 rounded-[22px] bg-black/20 p-5">
            <img
              src="/images/pro-design.jpg"
              alt="PRO RUNNER"
              className="mx-auto w-[150px] object-contain sm:w-[180px]"
            />
          </div>

          <p className="mt-5 text-sm leading-6 text-gray-300">
            Premium footwear crafted for all-day comfort, durability, and
            modern style—perfect for work, sports, or everyday wear.
          </p>

          <Link to="/products">
            <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95">
              View Products
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}