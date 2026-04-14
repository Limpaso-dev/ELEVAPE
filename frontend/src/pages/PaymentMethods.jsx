export default function PaymentMethods() {
  return (
    <div className="pt-24 md:pt-28 px-4 sm:px-6 md:px-10 max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
        Payment Methods
      </h1>

      <p className="text-gray-400 mb-8 text-sm sm:text-base">
        At <span className="text-white font-semibold">Elevape</span>, we offer secure and convenient payment options 
        to ensure a smooth checkout experience.
      </p>

      <div className="space-y-6 sm:space-y-8 text-gray-300 leading-relaxed text-sm sm:text-base">

        {/* PAYMENT OPTIONS */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
            Accepted Payment Methods
          </h2>

          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
            {[
              "Visa",
              "Mastercard",
              "Apple Pay",
              "Google Pay",
            ].map((method) => (
              <li
                key={method}
                className="bg-white/10 rounded-lg p-3 text-center font-medium hover:bg-white/20 transition"
              >
                {method}
              </li>
            ))}
          </ul>
        </section>

        {/* FLUTTERWAVE
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
            Secure Payments with Flutterwave
          </h2>
          <p>
            All transactions are securely processed through our trusted payment partner. 
            Your card details are encrypted and handled safely — we do not store your payment information.
          </p>
        </section> */}

        {/* CURRENCY */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
            Currency
          </h2>
          <p>
            All payments are processed in AUD. If you are using an international card, your bank may 
            apply currency conversion charges.
          </p>
        </section>

        {/* SECURITY */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
            Payment Security
          </h2>
          <p>
            We use industry-standard security measures to protect your transactions. 
            Elevape does not store your full card details at any point.
          </p>
        </section>

        {/* CONTACT */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
            Need Help?
          </h2>
          <p>
            If you experience any issues during checkout, please contact our support team for assistance.
          </p>
        </section>

      </div>
    </div>
  );
}