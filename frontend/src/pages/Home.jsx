import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-full pt-16">

      {/* HERO SECTION */}
      <section className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <img
          src="/images/hero.jpeg"
          alt="hero"
          className="w-full h-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-black/60 flex items-center px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-xl"
          >
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Elevate Your Vaping Experience
            </h1>

            <p className="mt-4 text-sm md:text-base text-gray-200">
              Discover premium Vapes, unbeatable prices, and seamless delivery.
            </p>

            <Link to="/products">
              <button className="mt-6 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition">
                Shop Now
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

     {/* PRO BAR CTA (DARK THEME MATCH) */}
<section className="px-6 md:px-16 mt-14 flex justify-center">
  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 md:px-10 py-8 md:py-10 w-full max-w-md flex flex-col items-center text-center shadow-lg">

    {/* TITLE */}
    <h2 className="text-lg md:text-2xl font-bold tracking-wide text-white">
      PRO BAR
    </h2>
    <p className="text-gray-400 text-sm mt-1">
      10000 PUFFS
    </p>

    {/* IMAGE */}
    <img
      src="/images/PRO BAR.png"
      alt="PRO BAR"
      className="mt-5 w-[140px] md:w-[180px] object-contain"
    />

    {/* BUTTON */}
    <Link to="/products">
      <button className="mt-6 bg-white text-black px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 transition">
        Shop Now
      </button>
    </Link>

  </div>
</section>
      {/* WHY CHOOSE US */}
      <section className="px-6 md:px-16 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold leading-snug">
          Elevape Australia — Your Trusted Destination for Premium Vapes
        </h2>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Welcome to Elevape Australia, your go-to online store for high-quality, 
          innovative vaping products. We offer a carefully curated collection of 
          sleek, reliable, and flavour-rich devices designed for every type of user.
          <br /><br />
          From smooth fruity blends to bold icy hits, each product is selected for 
          consistency, performance, and quality you can trust. Experience seamless 
          shopping, fast service, and customer-first support.
        </p>
      </section>

    </div>
  );
}