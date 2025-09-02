import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, DASHBOARD_URL } from "../../config";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const redirectToMainApp = () => {
    // Try multiple redirect methods for better compatibility
    try {
      // Method 1: Direct window location assignment
      window.location.assign(DASHBOARD_URL;);
    } catch (error) {
      console.error("Redirect method 1 failed:", error);
      try {
        // Method 2: Using window.open and then closing current
        window.open(DASHBOARD_URL, "_self");
      } catch (error2) {
        console.error("Redirect method 2 failed:", error2);
        // Method 3: Fallback - manual instruction
        setMessage("✅ Signup successful! Please manually navigate to http://localhost:3001/");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Clear any previous messages
    setMessage("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage("⚠️ Passwords do not match.");
      setIsLoading(false);
      return;
    }

    // Basic password strength validation
    if (formData.password.length < 6) {
      setMessage("⚠️ Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/signup`, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      }, {
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (res.data.message === "Signup successful" || res.status === 200 || res.status === 201) {
        setMessage("🎉 Signup successful! Redirecting to main application...");
        
        // Store user data if needed (optional)
        if (res.data.token) {
          localStorage.setItem('authToken', res.data.token);
        }
        if (res.data.user) {
          localStorage.setItem('userData', JSON.stringify(res.data.user));
        }

        // Redirect after showing success message
        setTimeout(() => {
          redirectToMainApp();
        }, 2000); // Increased timeout for better UX

      } else {
        setMessage(res.data.message || "⚠️ Something went wrong during signup.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      
      if (err.code === 'ECONNABORTED') {
        setMessage("⚠️ Request timeout. Please check your connection and try again.");
      } else if (err.response) {
        // Server responded with error status
        setMessage(err.response.data?.message || `⚠️ Server error: ${err.response.status}`);
      } else if (err.request) {
        // Request made but no response received
        setMessage("⚠️ No response from server. Please check if the backend is running on port 3002.");
      } else {
        // Something else happened
        setMessage("⚠️ Signup failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5 p-4">
      {/* Title Section */}
      <div className="text-center mb-5">
        <h2 style={{ color: "#2E2E38" }}>Create Your Account</h2>
        <p className="text-muted">
          Join us today and start your trading journey in just a few steps.
        </p>
      </div>

      {/* Signup Form */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="p-4 shadow rounded bg-light">
            {message && (
              <div 
                className={`alert text-center ${
                  message.includes('successful') ? 'alert-success' : 
                  message.includes('⚠️') ? 'alert-warning' : 'alert-info'
                }`}
              >
                {message}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  minLength="2"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Create a strong password (min 6 characters)"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  minLength="6"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  minLength="6"
                />
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="terms"
                  required
                  disabled={isLoading}
                />
                <label className="form-check-label" htmlFor="terms">
                  I agree to the{" "}
                  <Link to="/terms" className="text-decoration-none">
                    Terms & Conditions
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="btn w-100"
                style={{
                  background: isLoading 
                    ? "#6c757d" 
                    : "radial-gradient(circle, hsla(40, 100%, 50%, 1) 0%, hsla(54, 100%, 50%, 1) 99%)",
                  color: "#2E2E38",
                  fontWeight: "600",
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Signing Up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Extra Info */}
      <div className="text-center mt-4">
        <p className="text-muted">
          Already have an account?{" "}
          <Link to="/signin" className="text-decoration-none">
            Log in here
          </Link>
        </p>
      </div>

      {/* Debug Info - Remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-center mt-3">
          <small className="text-muted">
            Debug: Make sure your backend is running on port 3002 and main app on port 3001
          </small>
        </div>
      )}
    </div>
  );
}

export default Signup;
