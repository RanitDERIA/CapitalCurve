import React from "react";

function Brokerage() {
  return (
    <div className="container mt-5 p-4">
      {/* Title Section */}
      <div className="text-center mb-5">
        <h2 style={{ color: "hsla(31, 100%, 50%, 1)" }}>
          Charges Explained
        </h2>
        <p className="text-muted">
          A detailed breakdown of all charges involved in trading with us.
        </p>
      </div>

      {/* Charges Section */}
      <div className="row g-4">
        <div className="col-md-6">
          <h4 className="fw-bold">Securities/Commodities Transaction Tax</h4>
          <p>
            Tax by the government when transacting on the exchanges. Charged on
            both buy and sell sides for equity delivery, and only on the selling
            side for intraday or F&O.  
            <br />
            <strong>Note:</strong> At Zerodha, STT/CTT can be more than the
            brokerage itself.
          </p>

          <h4 className="fw-bold mt-4">Transaction/Turnover Charges</h4>
          <p>
            Charged by exchanges (NSE, BSE, MCX) on the value of transactions.
            <ul>
              <li>BSE groups (XC, XD, XT, Z, ZP): ₹10,000 per crore</li>
              <li>SS & ST groups: ₹1,00,000 per crore</li>
              <li>Group A, B & others: ₹375 per crore (flat)</li>
              <li>M, MT, TS, MS groups: ₹275 per crore</li>
            </ul>
          </p>

          <h4 className="fw-bold mt-4">Call & Trade</h4>
          <p>₹50 per order through a dealer, including auto square-off orders.</p>

          <h4 className="fw-bold mt-4">Stamp Charges</h4>
          <p>
            As per the Indian Stamp Act of 1899, charged when transacting in
            instruments on stock exchanges and depositories.
          </p>

          <h4 className="fw-bold mt-4">NRI Brokerage Charges</h4>
          <ul>
            <li>₹100 per order for Futures & Options</li>
            <li>
              Equity (Non-PIS): 0.5% or ₹100 per order (whichever is lower)
            </li>
            <li>
              Equity (PIS): 0.5% or ₹200 per order (whichever is lower)
            </li>
            <li>AMC: ₹500 + GST yearly</li>
          </ul>
        </div>

        <div className="col-md-6">
          <h4 className="fw-bold">Account with Debit Balance</h4>
          <p>
            If the account is in debit balance, orders are charged ₹40 per
            executed order instead of ₹20.
          </p>

          <h4 className="fw-bold mt-4">Investor Protection Fund Trust (IPFT)</h4>
          <ul>
            <li>Equity & Futures: ₹10 per crore + GST</li>
            <li>Options: ₹50 per crore + GST (premium value)</li>
            <li>
              Currency: ₹0.05 per lakh (Futures), ₹2 per lakh (Options) + GST
            </li>
          </ul>

          <h4 className="fw-bold mt-4">Margin Trading Facility (MTF)</h4>
          <ul>
            <li>Interest: 0.04% per day (₹40 per lakh)</li>
            <li>Brokerage: 0.3% or ₹20 per order (whichever is lower)</li>
            <li>Pledge Charge: ₹15 + GST per ISIN</li>
          </ul>

          <h4 className="fw-bold mt-4">Other Charges</h4>
          <ul>
            <li>GST: 18% of (Brokerage + SEBI + Transaction charges)</li>
            <li>SEBI Charges: ₹10 per crore + GST</li>
            <li>
              DP Charges: ₹15.34 per scrip when stocks are sold (discounts for
              female account holders & mutual funds)
            </li>
            <li>Pledging Charges: ₹30 + GST per ISIN</li>
            <li>AMC: ₹300/year + GST (non-BSDA accounts)</li>
            <li>
              Corporate Action Orders: ₹20 + GST (OFS/Buyback/Takeover/Delisting)
            </li>
            <li>Off-market Transfer: ₹25 per transaction</li>
            <li>
              Physical CMR Request: 1st free, then ₹20 + courier + GST
            </li>
            <li>Payment Gateway: ₹9 + GST (UPI transfers are free)</li>
            <li>Delayed Payment: 18% yearly or 0.05% daily</li>
            <li>
              3-in-1 Trading: Delivery & MTF (0.5%), Intraday (0.05% per order)
            </li>
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-5 p-4 bg-light rounded shadow-sm">
        <h5 className="fw-bold">Disclaimer</h5>
        <p className="text-muted">
          For Delivery trades, minimum ₹0.01 per contract note will be charged.
          Physical contract notes: ₹20 + courier charges. Brokerage will not
          exceed SEBI/exchange-specified limits. Charges apply on expired,
          exercised, and assigned options contracts. Free investments are only
          for retail individual clients. Other entities (companies, trusts, HUFs)
          pay 0.1% or ₹20 (whichever is less) as delivery brokerage. For
          physically settled contracts: 0.25% of contract value (or 0.1% for
          netted positions).
        </p>
      </div>
    </div>
  );
}

export default Brokerage;
