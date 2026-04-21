import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-full bg-[#0a0a0a] text-white space-y-12 md:space-y-16">

      {/* ================= HERO ================= */}
      <section className="relative w-full h-[48vh] sm:h-[35vh] md:h-[45vh] lg:h-[55vh] overflow-hidden rounded-xl">
        <img
          src="/images/hero.jpeg"
          alt="hero"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70 flex items-center">
          <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xs sm:max-w-sm md:max-w-md"
            >
              <h1 className="text-lg sm:text-2xl md:text-4xl font-bold leading-tight">
                Elevate Your Vaping Experience
              </h1>

              <p className="mt-2 text-sm md:text-base text-gray-300">
                Premium devices. Bold flavours.
              </p>

              <Link to="/products">
                <button className="mt-4 bg-gradient-to-r from-primary to-secondary px-5 py-2.5 rounded-lg text-sm md:text-base font-semibold shadow-md hover:scale-105 transition">
                  Shop Now
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCT ================= */}
      <section className="text-center px-4 sm:px-6 md:px-10 max-w-6xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Featured Product
        </h2>

        <p className="text-gray-400 text-sm mt-2">
          One of our most popular picks
        </p>

        <div className="mt-8 flex justify-center">
          <div className="glass border border-white/10 rounded-xl px-5 sm:px-6 md:px-8 py-6 w-full max-w-sm flex flex-col items-center text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition">

            <h3 className="text-base sm:text-lg font-semibold">
              PRO BAR
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              10000 PUFFS
            </p>

            <img
              src="/images/PRO BAR.png"
              alt="PRO BAR"
              className="mt-5 w-[120px] sm:w-[150px] md:w-[180px] object-contain"
            />

            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
              Smooth, long-lasting vape with consistent flavour performance.
            </p>

            <Link to="/products">
              <button className="mt-5 bg-gradient-to-r from-primary to-secondary px-5 py-2.5 rounded-lg text-sm font-semibold hover:scale-105 transition">
                View Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="text-center px-4 sm:px-6 md:px-10 pb-10 md:pb-14 max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Elevape — Premium Vaping
        </h2>

        <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
          Elevape offers high-quality vaping devices built for performance and
          bold flavour experiences. Whether you're new or experienced, enjoy
          smooth blends and a seamless shopping experience.
        </p>
      </section>

    </div>
  );
}