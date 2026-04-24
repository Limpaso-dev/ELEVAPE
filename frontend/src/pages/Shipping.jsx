export default function Shipping() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
        Shipping Policy
      </h1>

      <p className="text-gray-400 text-sm sm:text-base">
        Delivery & Dispatch Policy
      </p>

      <div className="space-y-6 sm:space-y-8 text-gray-300 leading-relaxed text-sm sm:text-base">

        {/* INTRO */}
        <section>
          <p>
            At <span className="text-white font-semibold">ELEVAPE</span>, we strive to process and deliver your furniture orders efficiently, 
            while keeping you informed every step of the way.
          </p>
        </section>

        {/* PROCESSING */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            Processing and Dispatch Times
          </h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>Orders are processed within 2 business days of payment confirmation.</li>
            <li>Once processed, orders are prepared for delivery within the next business day.</li>
          </ul>
        </section>

        {/* DELIVERY */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            Delivery Details
          </h2>
          <p>
            Delivery fee: <span className="text-white font-semibold">KES 3,000</span> nationwide.
          </p>
        </section>

        {/* IMPORTANT */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            Important Information
          </h2>
          <p>
            Delivery times are estimates based on standard logistics timelines.
            Once your order is dispatched, delivery is subject to external factors
            such as weather, public holidays, or high demand periods.
          </p>
        </section>

        {/* TRACKING */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            Tracking Your Order
          </h2>
          <p>
            You will receive tracking details via email once your order has been dispatched,
            allowing you to monitor your delivery progress.
          </p>
        </section>

        {/* OUT OF STOCK */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            Handling Out-of-Stock Items
          </h2>
          <p className="mb-2">
            In rare cases where an item is temporarily out of stock:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Available items will be delivered immediately to avoid delays.</li>
            <li>Missing items will be delivered separately once restocked — at no extra cost.</li>
          </ul>
          <p className="mt-2">
            Our goal is to ensure you receive your furniture as quickly as possible with minimal inconvenience.
          </p>
        </section>

        {/* DELIVERY TABLE */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3">
            Delivery Estimates Across Kenya
          </h2>

          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-white/10 text-white">
                <tr>
                  <th className="p-2 text-left">Region</th>
                  <th className="p-2 text-left">Estimated Delivery</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Nairobi", "1–2 days"],
                  ["Mombasa", "2–4 days"],
                  ["Kisumu", "2–4 days"],
                  ["Nakuru", "1–3 days"],
                  ["Eldoret", "2–4 days"],
                  ["Thika", "1–2 days"],
                  ["Machakos", "1–2 days"],
                  ["Nyeri", "2–3 days"],
                ].map(([state, time]) => (
                  <tr key={state} className="border-t border-white/10">
                    <td className="p-2">{state}</td>
                    <td className="p-2">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ADDRESS */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            Address Accuracy
          </h2>
          <p>
            It is the customer’s responsibility to ensure all delivery details are correct,
            including County, Town, and Postal Code to avoid delays or delivery issues.
          </p>
        </section>

        {/* CONTACT */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
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