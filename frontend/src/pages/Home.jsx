import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-full space-y-12 md:space-y-16">

      {/* ================= HERO ================= */}
      <section className="relative w-full h-[28vh] sm:h-[35vh] md:h-[45vh] lg:h-[55vh] overflow-hidden rounded-xl">
        <img
          src="/images/hero.jpeg"
          alt="hero"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white max-w-xs sm:max-w-sm md:max-w-md"
            >
              <h1 className="text-lg sm:text-2xl md:text-4xl font-bold leading-tight">
                Elevate Your Vaping Experience
              </h1>

              <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-300">
                Premium devices. Bold flavours.
              </p>

              <Link to="/products">
                <button className="mt-4 bg-gradient-to-r from-primary to-secondary px-4 py-2 rounded-md text-xs sm:text-sm md:text-base font-semibold hover:opacity-90 transition">
                  Shop Now
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCT ================= */}
      <section className="text-center px-2 sm:px-4">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold">
          Featured Product
        </h2>

        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          One of our most popular picks
        </p>

        <div className="mt-6 flex justify-center">
          <div className="glass border border-white/10 rounded-xl px-4 sm:px-6 md:px-8 py-6 w-full max-w-xs sm:max-w-sm flex flex-col items-center text-center shadow-lg hover:shadow-xl transition">

            <h3 className="text-base sm:text-lg font-semibold text-white">
              PRO BAR
            </h3>

            <p className="text-gray-400 text-xs mt-1">
              10000 PUFFS
            </p>

            <img
              src="/images/PRO BAR.png"
              alt="PRO BAR"
              className="mt-4 w-[90px] sm:w-[120px] md:w-[160px] object-contain"
            />

            <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed px-1">
              Smooth, long-lasting vape with consistent flavour performance.
            </p>

            <Link to="/products">
              <button className="mt-4 bg-gradient-to-r from-primary to-secondary px-4 py-2 rounded-md text-xs sm:text-sm font-semibold hover:opacity-90 transition">
                View Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="text-center px-2 sm:px-4 pb-6 sm:pb-10 md:pb-12">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold">
          Elevape Australia — Premium Vaping
        </h2>

        <p className="mt-4 text-gray-400 max-w-xs sm:max-w-md md:max-w-xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed">
          Elevape offers high-quality vaping devices built for performance and
          bold flavour experiences. Whether you're new or experienced, enjoy
          smooth blends and a seamless shopping experience.
        </p>
      </section>

    </div>
  );
}