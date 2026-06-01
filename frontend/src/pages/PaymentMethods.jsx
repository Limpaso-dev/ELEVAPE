export default function PaymentMethods() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
        Payment Methods
      </h1>

      <p className="text-gray-400 text-sm sm:text-base">
        At <span className="text-white font-semibold">Elevape</span>, we offer secure and convenient payment options 
        to ensure a smooth checkout experience for your furniture purchases.
      </p>

      <div className="space-y-6 sm:space-y-8 text-gray-300 leading-relaxed text-sm sm:text-base">

        {/* PAYMENT OPTIONS */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            Accepted Payment Methods
          </h2>

          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mt-3">
            {[
              "Visa",
              "Bank Transfer",
              "Mobile Money",
            ].map((method) => (
              <li
                key={method}
                className="bg-white/10 rounded-lg p-3 text-center text-xs sm:text-sm font-medium hover:bg-white/20 transition"
              >
                {method}
              </li>
            ))}
          </ul>
        </section>

        {/* DPO */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            Secure Payments with DPO
          </h2>
          <p>
            All transactions are securely processed through Direct Pay Online. Your payment details are encrypted and handled 
            safely — we do not store your payment information.
          </p>
        </section>

        {/* CURRENCY */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            Currency
          </h2>
          <p>
            All payments are processed in USD. If you are using an international card, your bank may 
            apply currency conversion charges.
          </p>
        </section>

        {/* SECURITY */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            Payment Security
          </h2>
          <p>
            We use industry-standard security measures to protect your transactions. 
            Elevape does not store your full card details at any point.
          </p>
        </section>

        {/* CONTACT */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            Need Help?
          </h2>
          <p>
            If you experience any issues during checkout, please contact our support team for assistance with your order.
          </p>
        </section>

      </div>
    </div>
  );
}
