import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define backend URL with fallback
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Debug: Log the URL being used
        console.log('Fetching from:', `${BACKEND_URL}/allHoldings`);
        
        const response = await axios.get(`${BACKEND_URL}/allHoldings`, {
          timeout: 10000, // 10 second timeout
          headers: {
            'Content-Type': 'application/json',
            // Add any auth headers if needed
            // 'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('Response data:', response.data);
        setAllHoldings(response.data || []);
        
      } catch (err) {
        console.error('Error fetching holdings:', err);
        
        // More detailed error handling
        if (err.code === 'ECONNREFUSED') {
          setError('Backend server is not running. Please start your backend server.');
        } else if (err.code === 'ENOTFOUND') {
          setError('Backend server URL not found. Please check your REACT_APP_BACKEND_URL environment variable.');
        } else if (err.response) {
          setError(`Server error: ${err.response.status} - ${err.response.data?.message || 'Unknown error'}`);
        } else if (err.request) {
          setError('Network error: Unable to reach the server.');
        } else {
          setError(`Error: ${err.message}`);
        }
        
        // Set empty array as fallback
        setAllHoldings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, [BACKEND_URL]);

  // Chart data configuration
  const labels = allHoldings.map((stock) => stock.name || 'Unknown');
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price || 0),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // Calculate totals
  const totalInvestment = allHoldings.reduce((sum, stock) => sum + (stock.avg * stock.qty), 0);
  const currentValue = allHoldings.reduce((sum, stock) => sum + (stock.price * stock.qty), 0);
  const totalPL = currentValue - totalInvestment;
  const plPercentage = totalInvestment > 0 ? ((totalPL / totalInvestment) * 100) : 0;

  // Loading state
  if (loading) {
    return (
      <div>
        <h3 className="title">Holdings (Loading...)</h3>
        <p>Loading holdings data...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div>
        <h3 className="title">Holdings (Error)</h3>
        <div className="alert alert-danger">
          <strong>Error:</strong> {error}
          <br />
          <small>Backend URL: {BACKEND_URL}/allHoldings</small>
          <br />
          <button 
            className="btn btn-sm btn-primary mt-2" 
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>
      
      {allHoldings.length === 0 ? (
        <div className="alert alert-info">
          <p>No holdings data available.</p>
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
                {allHoldings.map((stock, index) => {
                  const curValue = (stock.price || 0) * (stock.qty || 0);
                  const avgCost = (stock.avg || 0) * (stock.qty || 0);
                  const profitLoss = curValue - avgCost;
                  const isProfit = profitLoss >= 0;
                  const profClass = isProfit ? "profit" : "loss";
                  const dayClass = stock.isLoss ? "loss" : "profit";
                  
                  return (
                    <tr key={index}>
                      <td>{stock.name || 'N/A'}</td>
                      <td>{stock.qty || 0}</td>
                      <td>{(stock.avg || 0).toFixed(2)}</td>
                      <td>{(stock.price || 0).toFixed(2)}</td>
                      <td>{curValue.toFixed(2)}</td>
                      <td className={profClass}>
                        {profitLoss.toFixed(2)}
                      </td>
                      <td className={profClass}>{stock.net || '0.00'}</td>
                      <td className={dayClass}>{stock.day || '0.00'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="row">
            <div className="col">
              <h5>
                {totalInvestment.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </h5>
              <p>Total investment</p>
            </div>
            <div className="col">
              <h5>
                {currentValue.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </h5>
              <p>Current value</p>
            </div>
            <div className="col">
              <h5 className={totalPL >= 0 ? "profit" : "loss"}>
                {totalPL.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })} ({plPercentage >= 0 ? '+' : ''}{plPercentage.toFixed(2)}%)
              </h5>
              <p>P&L</p>
            </div>
          </div>
          
          <VerticalGraph data={data} />
        </>
      )}
    </>
  );
};

export default Holdings;
