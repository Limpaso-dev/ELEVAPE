import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-full pt-16">

      {/* ================= HERO ================= */}
      <section className="relative h-[38vh] md:h-[48vh] overflow-hidden">
        <img
          src="/images/hero.jpeg"
          alt="hero"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex items-center px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-lg"
          >
            <h1 className="text-2xl md:text-4xl font-bold leading-tight">
              Elevate Your Vaping Experience
            </h1>

            <p className="mt-3 text-sm md:text-base text-gray-300">
              Premium devices. Bold flavours. Built for performance.
            </p>

            <Link to="/products">
              <button className="mt-5 bg-gradient-to-r from-primary to-secondary px-5 py-2.5 rounded-lg font-semibold hover:opacity-90 transition">
                Shop Now
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCT ================= */}
      <section className="px-6 md:px-16 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          Featured Product
        </h2>

        <p className="text-gray-400 text-sm mt-2">
          Discover one of our most popular choices
        </p>

        <div className="mt-10 flex justify-center">
          <div className="glass border border-white/10 rounded-2xl px-6 md:px-10 py-8 w-full max-w-md flex flex-col items-center text-center shadow-lg">

            <h3 className="text-xl font-semibold text-white">
              PRO BAR
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              10000 PUFFS • Smooth & Long-lasting
            </p>

            <img
              src="/images/PRO BAR.png"
              alt="PRO BAR"
              className="mt-6 w-[140px] md:w-[180px] object-contain"
            />

            <p className="text-gray-400 text-sm mt-4">
              A premium disposable vape designed for extended use,
              delivering consistent flavour and smooth performance.
            </p>

            <Link to="/products">
              <button className="mt-6 bg-gradient-to-r from-primary to-secondary px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition">
                View Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="px-6 md:px-16 pb-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          Elevape — Premium Vaping Redefined
        </h2>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Elevape delivers high-quality vaping devices designed for performance,
          reliability, and bold flavour experiences. Whether you're new or experienced,
          our curated selection ensures consistency and satisfaction.
          <br /><br />
          Enjoy smooth fruity blends, icy hits, and a seamless shopping experience
          built around quality and trust.
        </p>
      </section>

    </div>
  );
}