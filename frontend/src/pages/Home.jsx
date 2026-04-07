import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-full pt-16">

      {/* HERO SECTION (SMALLER) */}
      <section className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <img
          src="/images/hero.jpeg"
          alt="hero"
          className="w-full h-full object-cover scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 flex items-center px-6 md:px-16">
          
          {/* ANIMATED TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold"
            >
              Elevate Your Shopping Experience
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-sm md:text-base"
            >
              Discover quality products, great prices, and seamless delivery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/products">
                <button className="mt-6 bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition">
                  Shop Now
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECONDARY CTA BANNER (BIGGER + HOVER EFFECT) */}
      <section className="px-6 md:px-16 mt-12">
        <div className="relative rounded-2xl overflow-hidden h-[260px] md:h-[380px] group">
          <img
            src="/images/PRO BAR.png"
            alt="promo"
            className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-between px-6 md:px-12">
            <h2 className="text-white text-lg md:text-2xl font-semibold">
              {/* Limited Deals Available 🔥 */}
            </h2>
            <Link to="/products">
              <button className="bg-white text-black px-4 md:px-6 py-2 rounded-lg text-sm md:text-base">
                Explore
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-6 md:px-16 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          Elevape Australia ---
          Your Trusted Destination for Premium Vapes
        </h2>

        <p className="mt-6 text-white-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Welcome to Elevape Australia, your go-to online store for high-quality, innovative vaping products. We bring you a carefully curated selection of sleek, reliable, and flavour-packed devices designed to elevate your experience.

At Elevape, we cater to every type of vaper — from beginners to experienced users. Our collection features a wide range of premium disposable vapes and devices, available in rich, satisfying flavours to suit every preference.

From smooth fruity blends to bold icy hits, every product is selected to deliver consistency, performance, and quality you can trust.

We are committed to providing customers across Australia with a seamless shopping experience — backed by fast service, dependable products, and customer-focused support.

Choose Elevape — and elevate your vaping experience.
        </p>
      </section>

    </div>
  );
}