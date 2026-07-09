export default function Privacy() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
        Privacy Policy
      </h1>

      <p className="text-gray-400 text-sm sm:text-base">
        At <span className="text-white font-semibold">Elvara</span>, your privacy matters.
        This policy explains how we collect, use, and protect your information when you use our website to shop premium footwear.
      </p>

      <div className="space-y-6 sm:space-y-8 text-gray-300 leading-relaxed text-sm sm:text-base">

        {/* INTRO */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            1. Information We Collect
          </h2>
          <p>
            We may collect personal information such as your name, email, phone number,
            delivery address, and payment details when you place an order or create an account.
          </p>
        </section>

        {/* USAGE */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>To process and deliver your footwear orders</li>
            <li>To communicate updates about your purchase</li>
            <li>To improve our website and services</li>
            <li>To provide customer support</li>
          </ul>
        </section>

        {/* ACCOUNT */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            3. Account Responsibility
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your account details.
            Any activity under your account is your responsibility.
          </p>
        </section>

        {/* DATA SECURITY */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            4. Data Protection
          </h2>
          <p>
            We implement security measures to protect your data. However, no online system is
            100% secure, and we cannot guarantee absolute protection.
          </p>
        </section>

        {/* THIRD PARTY */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            5. Third-Party Services
          </h2>
          <p>
            We may use trusted third-party services (such as payment processors) to handle
            transactions. We do not store your full payment details.
          </p>
        </section>

        {/* USER CONTENT */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            6. User Content
          </h2>
          <p>
            Any reviews, comments, or content you post may be publicly visible. Please avoid
            sharing sensitive information in public areas of the website.
          </p>
        </section>

        {/* COOKIES */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            7. Cookies & Tracking
          </h2>
          <p>
            We may use cookies to enhance your browsing experience, analyze traffic,
            and personalize content.
          </p>
        </section>

        {/* ELIGIBILITY */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            8. Eligibility
          </h2>
          <p>
            You must be at least 18 years old to use this website or make purchases from Elvara.
          </p>
        </section>

        {/* CHANGES */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            9. Updates to This Policy
          </h2>
          <p>
            We may update this Privacy Policy at any time. Continued use of the website means
            you accept any changes.
          </p>
        </section>

        {/* CONTACT */}
        <section>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            10. Contact Us
          </h2>
          <p>
            If you have any questions about this policy, please contact our support team.
          </p>
        </section>

      </div>
    </div>
  );
}