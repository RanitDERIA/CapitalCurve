import React from "react";

function Support() {
  return (
    <div className="container my-5">
      <div className="row text-center mb-4">
        <h2>
          Support & FAQs
        </h2>
        <p className="text-muted">
          Find answers to the most common questions about using our platform.
        </p>
      </div>

      <div className="accordion" id="faqAccordion">
        {/* FAQ 1 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="faq1">
            <button
              className="accordion-button"
              type="button"
              // style={{ backgroundColor: "hsla(31, 100%, 50%, 1)", color:"#2e2e38" }}
              data-bs-toggle="collapse"
              data-bs-target="#collapse1"
              aria-expanded="true"
              aria-controls="collapse1"
            >
              How do I open an account?
            </button>
          </h2>
          <div
            id="collapse1"
            className="accordion-collapse collapse show"
            aria-labelledby="faq1"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body text-start">
              Opening an account is simple. Click on the{" "}
              <b>“Sign Up”</b> button on the homepage, fill in your details,
              upload KYC documents, and complete verification. You’ll receive a
              confirmation email once your account is active.
            </div>
          </div>
        </div>

        {/* FAQ 2 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="faq2">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse2"
              aria-expanded="false"
              aria-controls="collapse2"
            >
              What are the brokerage charges?
            </button>
          </h2>
          <div
            id="collapse2"
            className="accordion-collapse collapse"
            aria-labelledby="faq2"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body text-start">
              We follow a flat fee structure of <b>₹20 per executed order</b> or{" "}
              <b>0.03%</b> (whichever is lower). Delivery trades are{" "}
              <b>absolutely free</b>. Visit our{" "}
              <a href="/brokerage" className="text-decoration-none">
                Brokerage Calculator
              </a>{" "}
              for a detailed breakdown of all charges.
            </div>
          </div>
        </div>

        {/* FAQ 3 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="faq3">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse3"
              aria-expanded="false"
              aria-controls="collapse3"
            >
              How can I withdraw funds?
            </button>
          </h2>
          <div
            id="collapse3"
            className="accordion-collapse collapse"
            aria-labelledby="faq3"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body text-start">
              You can place a withdrawal request anytime through your account
              dashboard. All requests placed before <b>3:30 PM</b> are processed
              the same day, and funds are credited to your registered bank
              account within <b>T+1 working days</b>.
            </div>
          </div>
        </div>

        {/* FAQ 4 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="faq4">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse4"
              aria-expanded="false"
              aria-controls="collapse4"
            >
              Do you provide customer support?
            </button>
          </h2>
          <div
            id="collapse4"
            className="accordion-collapse collapse"
            aria-labelledby="faq4"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body text-start">
              Yes! We provide multi-channel support:
              <ul>
                <li>Email: <b>support@elevate.com</b></li>
                <li>Live chat available from 9 AM – 9 PM (Mon–Sat)</li>
                <li>Phone: +91-9876543210</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ 5 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="faq5">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse5"
              aria-expanded="false"
              aria-controls="collapse5"
            >
              Is my data safe on Elevate?
            </button>
          </h2>
          <div
            id="collapse5"
            className="accordion-collapse collapse"
            aria-labelledby="faq5"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body text-start">
              Absolutely. We use <b>256-bit SSL encryption</b>,{" "}
              <b>two-factor authentication (2FA)</b>, and comply with{" "}
              <b>SEBI-mandated</b> security measures. Your funds and personal
              information remain 100% secure.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
