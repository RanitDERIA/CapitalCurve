import React, { useState } from "react";

const Contact = () => {
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() !== "") {
            setSubmitted(true);
            setMessage("");
        }
    };

    return (
        <div className="container mt-5 p-4 border rounded-3 shadow">
            <h2 className="mb-4">Contact Us</h2>
            <p>
                Have a question, feedback, or need support?  
                You can directly reach me at:  
                <strong>
                    {" "}
                    <a href="mailto:workforranit@yahoo.com" style={{ color: "#007bff", textDecoration: "none" }}>
                        workforranit@yahoo.com
                    </a>
                </strong>
            </p>

            <p className="text-muted">
                Alternatively, you can drop a quick message below. We value your time
                and will get back to you as soon as possible.
            </p>

            {/* Contact Form */}
            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Your Message</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            placeholder="Write your message here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={message.trim() === ""}
                        style={{
                            background: "linear-gradient(90deg, #FFD700, #FFB800)",
                            border: "none",
                            color: "#2E2E38",
                            fontWeight: "600",
                        }}
                    >
                        Send Message
                    </button>
                </form>
            ) : (
                <div className="alert alert-success mt-3">
                    ✅ Your message has been submitted! We’ll get back to you soon.
                </div>
            )}

            {/* Extra Info */}
            <div className="mt-5">
                <h5>Other Ways to Connect</h5>
                <ul>
                    <li>Follow our updates on LinkedIn and GitHub.</li>
                    <li>Check out our Pricing and Support pages for quick answers.</li>
                    <li>Visit our office during working hours (Mon–Fri, 10 AM – 6 PM).</li>
                </ul>
            </div>
        </div>
    );
};

export default Contact;
