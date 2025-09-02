import React, { useEffect, useState } from "react";
import axios from "axios";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rawData, setRawData] = useState(null);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("🔄 Fetching positions from API...");
        
        // Method 1: Try with axios (better CORS handling)
        const response = await axios.get("https://elevate-broking.onrender.com/allPositions", {
          timeout: 15000, // 15 second timeout
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          // Enable CORS
          withCredentials: false, // Set to true if you need to send cookies
        });

        console.log("📊 Response status:", response.status);
        console.log("📊 Response data:", response.data);
        
        const data = response.data;
        setRawData(data);

        // Handle different possible data structures
        let positionsData = [];
        
        if (Array.isArray(data)) {
          // Data is directly an array (as in your case)
          positionsData = data;
        } else if (data.positions && Array.isArray(data.positions)) {
          positionsData = data.positions;
        } else if (data.data && Array.isArray(data.data)) {
          positionsData = data.data;
        } else if (data.result && Array.isArray(data.result)) {
          positionsData = data.result;
        } else {
          console.warn("⚠️ Unexpected data structure:", data);
          positionsData = [];
        }

        console.log("✅ Processed positions data:", positionsData);
        console.log("📊 Number of positions:", positionsData.length);

        setPositions(positionsData);
      } catch (error) {
        console.error("❌ Error fetching positions:", error);
        
        // Provide more specific error messages
        let errorMessage = "Failed to fetch positions";
        
        if (error.code === 'ECONNABORTED') {
          errorMessage = "Request timeout - API is taking too long to respond";
        } else if (error.response) {
          // Server responded with error status
          errorMessage = `Server error: ${error.response.status} - ${error.response.statusText}`;
        } else if (error.request) {
          // Request made but no response received - likely CORS
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

    // Fallback method using fetch with no-cors mode (limited functionality)
    const tryFallbackMethod = async () => {
      try {
        console.log("🔄 Attempting fallback fetch...");
        
        // This will work but won't give us the response data due to no-cors
        const response = await fetch("https://elevate-broking.onrender.com/allPositions", {
          method: 'GET',
          mode: 'no-cors', // This bypasses CORS but limits response access
        });
        
        // With no-cors, we can't read the response, so we'll use mock data for now
        console.log("⚠️ Fallback method executed, but cannot read response due to CORS restrictions");
        
        // You could set mock data here for development
        // setPositions([mockData]);
        
      } catch (fallbackError) {
        console.error("❌ Fallback method also failed:", fallbackError);
      }
    };

    fetchPositions();
  }, []);

  // Retry function
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Re-trigger the useEffect
    window.location.reload();
  };

  // Loading state
  if (loading) {
    return (
      <div className="positions-container">
        <h3 className="title">Positions (Loading...)</h3>
        <div className="text-center p-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Fetching your positions...</p>
          <small className="text-muted">This may take a few seconds...</small>
        </div>
      </div>
    );
  }

  // Error state with detailed troubleshooting
  if (error) {
    return (
      <div className="positions-container">
        <h3 className="title">Positions (Error)</h3>
        <div className="alert alert-danger">
          <h5>❌ Failed to load positions</h5>
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
              onClick={() => window.open('https://elevate-broking.onrender.com/allPositions', '_blank')}
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
      <h3 className="title">Positions ({positions.length})</h3>
      
      {positions.length === 0 ? (
        <div className="text-center p-4">
          <p className="text-muted">No positions found</p>
          <small className="text-muted">
            You don't have any open positions at the moment.
          </small>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg.</th>
                <th>Price</th>
                <th>P&L</th>
                <th>Day Change</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((stock, index) => {
                try {
                  const product = stock.product || 'N/A';
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
                      <td>{product}</td>
                      <td>{name}</td>
                      <td>{qty}</td>
                      <td>₹{avg.toFixed(2)}</td>
                      <td>₹{price.toFixed(2)}</td>
                      <td className={profClass}>
                        ₹{pnl.toFixed(2)}
                      </td>
                      <td className={dayClass}>{day}</td>
                    </tr>
                  );
                } catch (rowError) {
                  console.error("❌ Error rendering row:", rowError, stock);
                  return (
                    <tr key={index}>
                      <td colSpan="7" className="text-danger">
                        Error displaying this position
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Debug panel for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-3 bg-light border rounded">
          <h6>🔧 Debug Info (Development Only)</h6>
          <small>
            <strong>API URL:</strong> https://elevate-broking.onrender.com/allPositions<br/>
            <strong>Status:</strong> {error ? '❌ Error' : '✅ Success'}<br/>
            <strong>Positions Count:</strong> {positions.length}<br/>
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

export default Positions;
