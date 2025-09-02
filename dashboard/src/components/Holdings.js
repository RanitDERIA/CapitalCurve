import React, { useEffect, useState } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rawData, setRawData] = useState(null);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("🔄 Fetching holdings from API...");
        
        const response = await axios.get("https://elevate-broking.onrender.com/allHoldings", {
          timeout: 15000,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          withCredentials: false,
        });

        console.log("📊 Response status:", response.status);
        console.log("📊 Response data:", response.data);
        
        const data = response.data;
        setRawData(data);

        // Handle different possible data structures
        let holdingsData = [];
        
        if (Array.isArray(data)) {
          holdingsData = data;
        } else if (data.holdings && Array.isArray(data.holdings)) {
          holdingsData = data.holdings;
        } else if (data.data && Array.isArray(data.data)) {
          holdingsData = data.data;
        } else if (data.result && Array.isArray(data.result)) {
          holdingsData = data.result;
        } else {
          console.warn("⚠️ Unexpected data structure:", data);
          holdingsData = [];
        }

        console.log("✅ Processed holdings data:", holdingsData);
        console.log("📊 Number of holdings:", holdingsData.length);

        setHoldings(holdingsData);
      } catch (error) {
        console.error("❌ Error fetching holdings:", error);
        
        let errorMessage = "Failed to fetch holdings";
        
        if (error.code === 'ECONNABORTED') {
          errorMessage = "Request timeout - API is taking too long to respond";
        } else if (error.response) {
          errorMessage = `Server error: ${error.response.status} - ${error.response.statusText}`;
        } else if (error.request) {
          errorMessage = "Network error - This might be a CORS issue. The API is not allowing requests from this domain.";
        } else if (error.message.includes('cors')) {
          errorMessage = "CORS error - The API needs to allow requests from your domain";
        } else {
          errorMessage = error.message;
        }
        
        setError(errorMessage);

        // Fallback: Try with a different approach
        console.log("🔄 Trying fallback method...");
        await tryFallbackMethod();
      } finally {
        setLoading(false);
      }
    };

    // Fallback method using fetch with no-cors mode
    const tryFallbackMethod = async () => {
      try {
        console.log("🔄 Attempting fallback fetch...");
        
        const response = await fetch("https://elevate-broking.onrender.com/allHoldings", {
          method: 'GET',
          mode: 'no-cors',
        });
        
        console.log("⚠️ Fallback method executed, but cannot read response due to CORS restrictions");
        
      } catch (fallbackError) {
        console.error("❌ Fallback method also failed:", fallbackError);
      }
    };

    fetchHoldings();
  }, []);

  // Retry function
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Re-trigger the useEffect
    window.location.reload();
  };

  // Calculate totals
  const calculateTotals = () => {
    let totalInvestment = 0;
    let totalCurrentValue = 0;
    
    holdings.forEach(stock => {
      totalInvestment += (stock.avg || 0) * (stock.qty || 0);
      totalCurrentValue += (stock.price || 0) * (stock.qty || 0);
    });
    
    const totalPnL = totalCurrentValue - totalInvestment;
    const totalPnLPercentage = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;
    
    return {
      investment: totalInvestment.toFixed(2),
      currentValue: totalCurrentValue.toFixed(2),
      pnl: totalPnL.toFixed(2),
      pnlPercentage: totalPnLPercentage.toFixed(2)
    };
  };

  const totals = calculateTotals();

  // Prepare chart data
  const chartData = {
    labels: holdings.map(stock => stock.name || 'Unknown'),
    datasets: [
      {
        label: "Stock Price",
        data: holdings.map(stock => stock.price || 0),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // Loading state
  if (loading) {
    return (
      <div className="holdings-container">
        <h3 className="title">Holdings (Loading...)</h3>
        <div className="text-center p-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Fetching your holdings...</p>
          <small className="text-muted">This may take a few seconds...</small>
        </div>
      </div>
    );
  }

  // Error state with detailed troubleshooting
  if (error) {
    return (
      <div className="holdings-container">
        <h3 className="title">Holdings (Error)</h3>
        <div className="alert alert-danger">
          <h5>❌ Failed to load holdings</h5>
          <p><strong>Error:</strong> {error}</p>
          
          {error.includes('CORS') && (
            <div className="mt-3 p-3 bg-light border-start border-warning border-4">
              <h6>🔧 CORS Issue - Possible Solutions:</h6>
              <ol className="mb-2">
                <li>Ask your backend developer to add CORS headers</li>
                <li>Use a proxy in your React app's package.json</li>
                <li>Use a browser extension to disable CORS (development only)</li>
              </ol>
              <small className="text-muted">
                The API at elevate-broking.onrender.com needs to allow requests from your domain.
              </small>
            </div>
          )}
          
          <div className="mt-3">
            <button className="btn btn-primary btn-sm me-2" onClick={handleRetry}>
              🔄 Retry
            </button>
            <button 
              className="btn btn-outline-secondary btn-sm"
              onClick={() => window.open('https://elevate-broking.onrender.com/allHoldings', '_blank')}
            >
              🔗 Open API Directly
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>
      
      {holdings.length === 0 ? (
        <div className="text-center p-4">
          <p className="text-muted">No holdings found</p>
          <small className="text-muted">
            You don't have any holdings at the moment.
          </small>
        </div>
      ) : (
        <>
          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Instrument</th>
                  <th>Qty.</th>
                  <th>Avg. cost</th>
                  <th>LTP</th>
                  <th>Cur. val</th>
                  <th>P&L</th>
                  <th>Net chg.</th>
                  <th>Day chg.</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((stock, index) => {
                  try {
                    const name = stock.name || 'Unknown';
                    const qty = stock.qty || 0;
                    const avg = parseFloat(stock.avg || 0);
                    const price = parseFloat(stock.price || 0);
                    const day = stock.day || '0.00%';
                    const net = stock.net || '0.00%';

                    const curValue = price * qty;
                    const pnl = curValue - (avg * qty);
                    const isProfit = pnl >= 0.0;
                    const profClass = isProfit ? "profit" : "loss";
                    const dayClass = stock.isLoss ? "loss" : "profit";

                    return (
                      <tr key={stock._id || index}>
                        <td>{name}</td>
                        <td>{qty}</td>
                        <td>₹{avg.toFixed(2)}</td>
                        <td>₹{price.toFixed(2)}</td>
                        <td>₹{curValue.toFixed(2)}</td>
                        <td className={profClass}>
                          ₹{pnl.toFixed(2)}
                        </td>
                        <td className={profClass}>{net}</td>
                        <td className={dayClass}>{day}</td>
                      </tr>
                    );
                  } catch (rowError) {
                    console.error("❌ Error rendering row:", rowError, stock);
                    return (
                      <tr key={index}>
                        <td colSpan="8" className="text-danger">
                          Error displaying this holding
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>

          <div className="row mt-3">
            <div className="col">
              <h5>
                ₹{totals.investment}
              </h5>
              <p>Total investment</p>
            </div>
            <div className="col">
              <h5>
                ₹{totals.currentValue}
              </h5>
              <p>Current value</p>
            </div>
            <div className="col">
              <h5 className={parseFloat(totals.pnl) >= 0 ? "profit" : "loss"}>
                ₹{totals.pnl} ({totals.pnlPercentage}%)
              </h5>
              <p>P&L</p>
            </div>
          </div>
          
          {holdings.length > 0 && <VerticalGraph data={chartData} />}
        </>
      )}

      {/* Debug panel for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-3 bg-light border rounded">
          <h6>🔧 Debug Info (Development Only)</h6>
          <small>
            <strong>API URL:</strong> https://elevate-broking.onrender.com/allHoldings<br/>
            <strong>Status:</strong> {error ? '❌ Error' : '✅ Success'}<br/>
            <strong>Holdings Count:</strong> {holdings.length}<br/>
            <strong>Loading:</strong> {loading ? 'Yes' : 'No'}<br/>
          </small>
          
          {rawData && (
            <details className="mt-2">
              <summary>Raw API Response</summary>
              <pre style={{fontSize: '11px', maxHeight: '200px', overflow: 'auto'}}>
                {JSON.stringify(rawData, null, 2)}
              </pre>
            </details>
          )}
        </div>
      )}
    </>
  );
};

export default Holdings;
