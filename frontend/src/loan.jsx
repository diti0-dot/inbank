import { useState } from "react";
import "./App.css";

export default function LoanForm() {
  const [form, setForm] = useState({
    personal_code: "49002010976",
    loan_amount: 2000,
    loan_period: 12
  });

  const [result, setResult] = useState(null);

  const personalCodes = [
    "49002010965", // debt
    "49002010976",
    "49002010987", 
    "49002010998", 
    "00000000000"  // invalid
  ];

  const amounts = Array.from({ length: 81 }, (_, i) => 2000 + i * 100);
  const periods = Array.from({ length: 49 }, (_, i) => 12 + i);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/loan/decision", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="loan-container">
      <div className="loan-card">
        <h2 className="loan-title">Loan Decision Engine</h2>

        <form onSubmit={handleSubmit} className="loan-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="personal_code">Personal Code:</label>
              <select 
                id="personal_code"
                name="personal_code" 
                value={form.personal_code}
                onChange={handleChange}
                className="form-select"
              >
                {personalCodes.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="loan_amount">Loan Amount (€):</label>
              <select 
                id="loan_amount"
                name="loan_amount" 
                value={form.loan_amount}
                onChange={handleChange}
                className="form-select"
              >
                {amounts.map((amt) => (
                  <option key={amt} value={amt}>
                    {amt} €
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="loan_period">Loan Period (months):</label>
              <select 
                id="loan_period"
                name="loan_period" 
                value={form.loan_period}
                onChange={handleChange}
                className="form-select"
              >
                {periods.map((p) => (
                  <option key={p} value={p}>
                    {p} months
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Check Eligibility
          </button>
        </form>

        {result && (
          <div className="result-container">
            <h3 className="result-title">Decision Result:</h3>
            {result.error ? (
              <p className="result-error">{result.error}</p>
            ) : (
              <div className="result-content">
                <div className="result-row">
                  <span className="result-label">Status:</span>
                  <span className={`result-value ${result.decision ? "approved" : "rejected"}`}>
                    {result.decision ? "✓ Approved" : "✗ Rejected"}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">Approved Amount:</span>
                  <span className="result-value amount">
                    {result.amount.toLocaleString()} €
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">Loan Period:</span>
                  <span className="result-value">{result.period} months</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}