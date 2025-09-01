import React from "react";

function Terms() {
  return (
    <div className="container mt-5 p-4">
      {/* Title Section */}
      <div className="text-center mb-5">
        <h2 style={{ color: "hsla(31, 100%, 50%, 1)" }}>Terms & Conditions</h2>
        <p className="text-muted">
          Please read these terms carefully before creating your account with{" "}
          <strong>Elevate</strong>.
        </p>
      </div>

      {/* Terms Content */}
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="p-4 shadow rounded bg-light">
            <h4 className="fw-bold">1. Account Registration</h4>
            <p>
              By signing up with <strong>Elevate</strong>, you confirm that all
              details you provide (name, email, phone number, etc.) are accurate
              and belong to you. Misrepresentation may lead to account
              suspension.
            </p>

            <h4 className="fw-bold mt-4">2. Use of Platform</h4>
            <p>
              Our platform is built as a student-driven project to help users
              understand brokerage concepts. While we strive for accuracy,
              <strong> Elevate is for educational purposes only</strong> and not
              a substitute for real-world financial advice.
            </p>

            <h4 className="fw-bold mt-4">3. Privacy & Data</h4>
            <p>
              We respect your privacy. Your information will only be used to
              enhance your experience on Elevate and will never be sold or
              shared with third parties without consent.
            </p>

            <h4 className="fw-bold mt-4">4. Responsibilities</h4>
            <ul>
              <li>
                You agree not to misuse the platform for fraudulent or harmful
                activities.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                login credentials.
              </li>
              <li>
                You accept that the project is for **learning purposes** and not
                liable for actual financial transactions.
              </li>
            </ul>

            <h4 className="fw-bold mt-4">5. Limitations</h4>
            <p>
              Since <strong>Elevate</strong> is a student project, certain
              features may be incomplete, simulated, or subject to change. We do
              not guarantee uninterrupted or error-free service.
            </p>

            <h4 className="fw-bold mt-4">6. Changes to Terms</h4>
            <p>
              We may update these terms from time to time to improve clarity or
              reflect new features. Continued use of the platform implies your
              acceptance of the latest terms.
            </p>

            <h4 className="fw-bold mt-4">7. Contact</h4>
            <p>
              For queries regarding these terms, please reach out at{" "}
              <a href="mailto:workforranit@yahoo.com">workforranit@yahoo.com</a>.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center mt-4">
        <p className="text-muted small">
          © {new Date().getFullYear()} Elevate. Built with ❤️ by Ranit Deria
        </p>
      </div>
    </div>
  );
}

export default Terms;
