export default function DeliveryLocations() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-5">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
        Delivery Locations
      </h1>

      <p className="text-gray-400 text-sm sm:text-base">
        We offer nationwide delivery across Kenya, bringing premium footwear
        directly to your doorstep. Whether you're in Nairobi, Mombasa, Kisumu,
        Nakuru, Eldoret, or any other county, Elvara ensures your order is
        delivered safely and on time.
      </p>

      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/10 text-white">
            <tr>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Estimated Delivery Time</th>
            </tr>
          </thead>

          <tbody className="text-gray-300">
            {[
              ["Nairobi", "1–2 Business Days"],
              ["Kiambu", "1–2 Business Days"],
              ["Machakos", "2–3 Business Days"],
              ["Nakuru", "2–3 Business Days"],
              ["Mombasa", "3–5 Business Days"],
              ["Kisumu", "3–5 Business Days"],
              ["Eldoret", "3–5 Business Days"],
              ["Nyeri", "2–4 Business Days"],
              ["Meru", "2–4 Business Days"],
              ["Rest of Kenya", "3–5 Business Days"],
            ].map(([location, time]) => (
              <tr key={location} className="border-t border-white/10">
                <td className="p-3">{location}</td>
                <td className="p-3">{time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-400">
        Delivery timelines are estimates and may vary slightly due to weather,
        public holidays, or courier operations. You'll receive shipping updates
        once your order has been dispatched.
      </p>
    </div>
  );
}