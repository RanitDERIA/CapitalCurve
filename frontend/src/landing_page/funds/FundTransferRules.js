import React, { useState } from "react";

const FundTransferRules = () => {
    const [search, setSearch] = useState("");
    const [importantRules, setImportantRules] = useState([]);
    const [accepted, setAccepted] = useState(false); // ✅ track checkbox state

    const rules = [
        "Minimum transfer amount is ₹100.",
        "Maximum transfer per day is ₹5,00,000.",
        "Only verified bank accounts are eligible for transfers.",
        "Funds transferred after 9 PM will be processed on the next working day.",
        "NEFT/RTGS transactions are subject to banking hours.",
        "UPI transfers are available 24x7 but limited to ₹1,00,000 per transaction.",
        "International transfers are not supported currently.",
        "Transaction fees are applicable as per government norms.",
        "All fund transfers are logged for audit and compliance.",
        "Users must complete KYC before initiating transfers.",
        "Failed transfers will be auto-refunded within 2–3 working days.",
        "Suspicious transactions may be flagged for review.",
        "Multiple failed attempts may temporarily block fund transfers.",
        "You cannot transfer funds to third-party accounts.",
        "Reversal of transactions is not allowed once completed."
    ];

    // Filter rules based on search
    const filteredRules = rules.filter((rule) =>
        rule.toLowerCase().includes(search.toLowerCase())
    );

    // Toggle important rules
    const toggleImportant = (rule) => {
        if (importantRules.includes(rule)) {
            setImportantRules(importantRules.filter((r) => r !== rule));
        } else {
            setImportantRules([...importantRules, rule]);
        }
    };

    return (
        <div className="container mt-5 p-4 border rounded-3 shadow">
            <h2 className="mb-4">Fund Transfer Rules</h2>

            {/* Search Bar */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search a rule..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Rules List */}
            <ul className="list-group">
                {filteredRules.length > 0 ? (
                    filteredRules.map((rule, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <span>
                                {rule}{" "}
                                {importantRules.includes(rule) && (
                                    <span className="badge bg-warning text-dark ms-2">
                                        ⭐ Important
                                    </span>
                                )}
                            </span>
                            <button
                                className={`btn btn-sm ${importantRules.includes(rule)
                                        ? "btn-danger"
                                        : "btn-outline-primary"
                                    }`}
                                onClick={() => toggleImportant(rule)}
                            >
                                {importantRules.includes(rule) ? "Remove" : "Mark Important"}
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item text-muted">
                        No rules match your search.
                    </li>
                )}
            </ul>

            {/* Accept Section */}
            <div className="form-check mt-4">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="acceptRules"
                    checked={accepted}
                     // ✅ update state
                                    />
                                    <label className="form-check-label" htmlFor="acceptRules">
                                        I have read and agree to the Fund Transfer Rules
                                    </label>
                                </div>

                                <button
                                    className="btn btn-success mt-3"
                                    disabled={!accepted} // ✅ button only enabled when checkbox is checked
                                    onClick={() => {
                                        if (accepted) {
                                            window.location.href = "https://www.google.com";
                                        }
                                    }}
                style={{
                    width: "25%",
                    margin: "0 auto",
                    background: "radial-gradient(circle, hsla(40, 100%, 50%, 1) 0%, hsla(54, 100%, 50%, 1) 99%)",
                    color: "#2E2E38",
                    border: "none",
                    fontWeight: "600",
                    cursor: accepted ? "pointer" : "not-allowed"
                }}
            >
                Proceed to Transfer
            </button>
        </div>
    );
};

export default FundTransferRules;
