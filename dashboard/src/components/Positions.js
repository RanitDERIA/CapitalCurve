import React, { useEffect, useState } from "react";

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
        
        const response = await fetch("https://elevate-broking.onrender.com/allPositions", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // Add any auth headers if needed
            // 'Authorization': `Bearer ${token}`,
          },
        });

        console.log("📊 Response status:", response.status);
        console.log("📊 Response headers:", response.headers);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("📊 Raw API response:", data);
        
        setRawData(data); // Store raw data for debugging

        // Handle different possible data structures
        let positionsData = [];
        
        if (Array.isArray(data)) {
          // Data is directly an array
          positionsData = data;
        } else if (data.positions && Array.isArray(data.positions)) {
          // Data is wrapped in an object with 'positions' key
          positionsData = data.positions;
        } else if (data.data && Array.isArray(data.data)) {
          // Data is wrapped in an object with 'data' key
          positionsData = data.data;
        } else if (data.result && Array.isArray(data.result)) {
          // Data is wrapped in an object with 'result' key
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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

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
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="positions-container">
        <h3 className="title">Positions (Error)</h3>
        <div className="alert alert-danger">
          <h5>❌ Failed to load positions</h5>
          <p>Error: {error}</p>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
        
        {/* Debug info in development */}
        {process.env.NODE_ENV === 'development' && rawData && (
          <details className="mt-3">
            <summary>Debug Info (Development Only)</summary>
            <pre style={{fontSize: '12px', background: '#f8f9fa', padding: '10px', borderRadius: '4px'}}>
              {JSON.stringify(rawData, null, 2)}
            </pre>
          </details>
        )}
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>
      
      {/* No positions message */}
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
                <th>LTP</th>
                <th>P&L</th>
                <th>Chg.</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((stock, index) => {
                try {
                  // Safe property access with fallbacks
                  const product = stock.product || stock.Product || 'N/A';
                  const name = stock.name || stock.instrument || stock.symbol || stock.Name || 'Unknown';
                  const qty = stock.qty || stock.quantity || stock.Qty || 0;
                  const avg = parseFloat(stock.avg || stock.avgPrice || stock.averagePrice || stock.Avg || 0);
                  const price = parseFloat(stock.price || stock.ltp || stock.currentPrice || stock.Price || 0);
                  const day = stock.day || stock.dayChange || stock.change || stock.Day || '0.00';

                  const curValue = price * qty;
                  const pnl = curValue - (avg * qty);
                  const isProfit = pnl >= 0.0;
                  const profClass = isProfit ? "profit" : "loss";
                  const dayClass = (typeof day === 'string' && day.includes('-')) || 
                                   (typeof day === 'number' && day < 0) || 
                                   stock.isLoss ? "loss" : "profit";

                  return (
                    <tr key={index}>
                      <td>{product}</td>
                      <td>{name}</td>
                      <td>{qty}</td>
                      <td>{avg.toFixed(2)}</td>
                      <td>{price.toFixed(2)}</td>
                      <td className={profClass}>
                        {pnl.toFixed(2)}
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
            <strong>API Status:</strong> {error ? '❌ Error' : '✅ Success'}<br/>
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
