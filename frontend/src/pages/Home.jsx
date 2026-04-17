import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-full pt-16">

      {/* ================= HERO ================= */}
      <section className="relative h-[32vh] md:h-[48vh] overflow-hidden">
        <img
          src="/images/hero.jpeg"
          alt="hero"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex items-center px-4 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white max-w-md"
          >
            <h1 className="text-xl md:text-4xl font-bold leading-tight">
              Elevate Your Vaping Experience
            </h1>

            <p className="mt-2 text-xs md:text-base text-gray-300">
              Premium devices. Bold flavours.
            </p>

            <Link to="/products">
              <button className="mt-4 bg-gradient-to-r from-primary to-secondary px-4 py-2 rounded-md text-sm font-semibold">
                Shop Now
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCT ================= */}
      <section className="px-4 md:px-16 py-10 md:py-16 text-center">
        <h2 className="text-xl md:text-3xl font-bold">
          Featured Product
        </h2>

        <p className="text-gray-400 text-xs md:text-sm mt-1">
          One of our most popular picks
        </p>

        <div className="mt-6 flex justify-center">
          <div className="glass border border-white/10 rounded-xl px-4 md:px-8 py-6 w-full max-w-sm flex flex-col items-center text-center shadow-lg">

            <h3 className="text-lg font-semibold text-white">
              PRO BAR
            </h3>

            <p className="text-gray-400 text-xs mt-1">
              10000 PUFFS
            </p>

            <img
              src="/images/PRO BAR.png"
              alt="PRO BAR"
              className="mt-4 w-[110px] md:w-[160px] object-contain"
            />

            <p className="text-gray-400 text-xs md:text-sm mt-3 leading-relaxed">
              Smooth, long-lasting vape with consistent flavour performance.
            </p>

            <Link to="/products">
              <button className="mt-4 bg-gradient-to-r from-primary to-secondary px-4 py-2 rounded-md text-xs md:text-sm font-semibold">
                View Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="px-4 md:px-16 pb-10 md:pb-16 text-center">
        <h2 className="text-xl md:text-3xl font-bold">
          Elevape — Premium Vaping
        </h2>

        <p className="mt-4 text-gray-400 max-w-xl mx-auto text-xs md:text-base leading-relaxed">
          Elevape offers high-quality vaping devices built for performance and
          bold flavour experiences. Whether you're new or experienced, enjoy
          smooth blends and a seamless shopping experience.
        </p>
      </section>

    </div>
  );
}