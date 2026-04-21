export default function Terms() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
        Terms & Conditions
      </h1>

      <p className="text-gray-400 text-sm sm:text-base">
        Welcome to <span className="text-white font-semibold">Elevape</span>. 
        By using our website, you agree to the following terms and conditions.
      </p>

      <div className="space-y-6 sm:space-y-8 text-gray-300 leading-relaxed text-sm sm:text-base">

        {/* INTRO */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            1. Eligibility
          </h2>
          <p>
            You must be at least 18 years old to use this website or purchase any products.
            By using this site, you confirm that you meet this requirement.
          </p>
        </section>

        {/* USE */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            2. Use of Website
          </h2>
          <p>
            You are granted a limited right to access and use this website for personal,
            non-commercial purposes. You may not misuse the site, attempt to hack it,
            or interfere with its operation.
          </p>
        </section>

        {/* ACCOUNT */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            3. Accounts & Security
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your account details.
            Any activity under your account is your responsibility.
          </p>
        </section>

        {/* ORDERS */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            4. Orders & Payments
          </h2>
          <p>
            All orders are subject to availability and confirmation. We reserve the right to cancel
            or refuse any order at our discretion. Payments must be made using approved methods.
          </p>
        </section>

        {/* PRICING */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            5. Pricing & Accuracy
          </h2>
          <p>
            We aim to ensure all product details and prices are accurate. However, errors may occur,
            and we reserve the right to correct them or cancel orders if necessary.
          </p>
        </section>

        {/* SHIPPING */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            6. Shipping & Delivery
          </h2>
          <p>
            Delivery times are estimates and may vary. Once orders are handed to the courier,
            we are not responsible for delays caused by third-party services.
          </p>
        </section>

        {/* USER CONTENT */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            7. User Content
          </h2>
          <p>
            Any reviews or content you submit must not be harmful, misleading, or illegal.
            We reserve the right to remove content that violates our policies.
          </p>
        </section>

        {/* LIABILITY */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            8. Limitation of Liability
          </h2>
          <p>
            Elevape is not liable for any indirect or consequential damages arising from the use
            of this website or our products.
          </p>
        </section>

        {/* TERMINATION */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            9. Account Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate accounts that violate these terms
            or misuse the platform.
          </p>
        </section>

        {/* CHANGES */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            10. Changes to Terms
          </h2>
          <p>
            We may update these Terms & Conditions at any time. Continued use of the website
            means you accept any changes.
          </p>
        </section>

        {/* CONTACT */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            11. Contact Us
          </h2>
          <p>
            If you have any questions about these terms, please contact our support team.
          </p>
        </section>

      </div>
    </div>
  );
}