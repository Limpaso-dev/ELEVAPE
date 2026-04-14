export default function Shipping() {
  return (
    <div className="pt-24 md:pt-28 px-4 sm:px-6 md:px-10 max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
        Shipping Policy
      </h1>
      <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
        Shipping & Dispatch Policy
      </p>

      <div className="space-y-6 sm:space-y-8 text-gray-300 leading-relaxed text-sm sm:text-base">

        {/* INTRO */}
        <section>
          <p>
            At <span className="text-white font-semibold">ELEVAPE</span>, we strive to process and deliver your orders efficiently, 
            while keeping you informed every step of the way.
          </p>
        </section>

        {/* PROCESSING */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
            Processing and Dispatch Times
          </h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>Orders are processed within 2 business days of payment confirmation.</li>
            {/* <li>Once processed, orders are dropped off to Australia Post within the next business day.</li> */}
          </ul>
        </section>

        {/* DELIVERY */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
            Delivery Details
          </h2>
          <p>
            Postage fee: <span className="text-white font-semibold">$30</span> for all states.
          </p>
        </section>

        {/* IMPORTANT
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
            Important Information
          </h2>
          <p>
            Delivery times are estimates based on Australia Post's service from NSW to your location.
            Once your order is handed over, delivery is subject to their network and external factors
            such as weather, public holidays, or high demand periods.
          </p>
        </section> */}

        {/* TRACKING
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
            Tracking Your Order
          </h2>
          <p>
            You will receive tracking details via email once your order has been dispatched.
            These allow you to monitor your delivery directly through Australia Post.
          </p>
        </section> */}

        {/* OUT OF STOCK */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
            Handling Out-of-Stock Items
          </h2>
          <p className="mb-2">
            In rare cases where an item is temporarily out of stock:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Available items will be shipped immediately to avoid delays.</li>
            <li>Missing items will be shipped separately once restocked — at no extra cost.</li>
          </ul>
          <p className="mt-2">
            Our goal is to ensure you receive your order as quickly as possible with minimal inconvenience.
          </p>
        </section>

        {/* DELIVERY TABLE
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
            Shipping Delivery Estimates
          </h2>

          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-white/10 text-white">
                <tr>
                  <th className="p-2 text-left">State / Territory</th>
                  <th className="p-2 text-left">Estimated Delivery</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["NSW", "2–3 days"],
                  ["VIC", "3–4 days"],
                  ["QLD", "3–4 days"],
                  ["SA", "3–5 days"],
                  ["WA", "4–6 days"],
                  ["TAS", "4–5 days"],
                  ["NT", "5–7 days"],
                  ["ACT", "2–3 days"],
                ].map(([state, time]) => (
                  <tr key={state} className="border-t border-white/10">
                    <td className="p-2">{state}</td>
                    <td className="p-2">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section> */}

        {/* ADDRESS */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
            Address Accuracy
          </h2>
          <p>
            It is the customer’s responsibility to ensure all shipping details are correct,
            including City, State, and Postcode to avoid delays or delivery errors.
          </p>
        </section>

        {/* CONTACT */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
            Need Help?
          </h2>
          <p>
            Didn’t find what you’re looking for? Contact our support team for assistance.
          </p>
        </section>

      </div>
    </div>
  );
}