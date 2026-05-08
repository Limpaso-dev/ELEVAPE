export default function CustomerSupport() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-5">

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
        Refund & Returns Policy
      </h1>

      <p className="text-gray-400 text-sm sm:text-base">
        At Elevape, we are committed to providing a smooth and reliable shopping experience. 
        If you need assistance or wish to return an item, please review the policy below.
      </p>

      <div className="space-y-5 text-gray-300 text-sm sm:text-base leading-relaxed">

        {/* INTRO */}
        <section>
          <h2 className="text-white font-semibold">Returns & Refunds</h2>
          <p>
            We understand that sometimes a product may not meet your expectations. 
            Elevape allows returns for most furniture items within 7 days of delivery, 
            subject to the conditions outlined below.
          </p>
        </section>

        {/* CONDITIONS */}
        <section>
          <h2 className="text-white font-semibold">Return Conditions</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>Items must be unused and in original condition</li>
            <li>All packaging and accessories must be intact</li>
            <li>Proof of purchase is required</li>
            <li>Assembled or used furniture may not be eligible unless defective</li>
          </ul>
        </section>

        {/* ELIGIBLE REASONS */}
        <section>
          <h2 className="text-white font-semibold">Valid Reasons for Returns</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>Damaged or defective items</li>
            <li>Incorrect item delivered</li>
            <li>Missing parts or accessories</li>
            <li>Item not as described</li>
          </ul>
        </section>

        {/* NON RETURNABLE */}
        <section>
          <h2 className="text-white font-semibold">Non-Returnable Items</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>Items returned after 7 days</li>
            <li>Used or customer-damaged products</li>
            <li>Custom-made or special-order furniture</li>
            <li>Items without original packaging</li>
          </ul>
        </section>

        {/* REFUNDS */}
        <section>
          <h2 className="text-white font-semibold">Refund Process</h2>
          <p>
            Once your item is received and inspected, approved refunds are processed 
            within 2–7 business days depending on your location. Refunds are issued 
            to the original payment method used at checkout.
          </p>
        </section>

        {/* CONTACT */}
        <section>
          <h2 className="text-white font-semibold">Contact Us</h2>
          <ul className="space-y-1">
            <li>Email: mepetu3@gmail.com</li>
            <li>Phone: +2547 573 582 37</li>
            <li>Hours: Monday - Saturday (9AM - 6PM)</li>
          </ul>
        </section>

      </div>

    </div>
  );
}