import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, DASHBOARD_URL } from '../../config';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const redirectToMainApp = () => {
    // Try multiple redirect methods for better compatibility
    try {
      // Method 1: Using window.location.assign (more reliable than href)
      window.location.assign(DASHBOARD_URL);
    } catch (error) {
      console.error("Redirect method 1 failed:", error);
      try {
        // Method 2: Using window.location.replace
        window.location.replace(DASHBOARD_URL);
      } catch (error2) {
        console.error("Redirect method 2 failed:", error2);
        try {
          // Method 3: Using window.open with _self
          window.open(DASHBOARD_URL, "_self");
        } catch (error3) {
          console.error("Redirect method 3 failed:", error3);
          // Method 4: Fallback - show manual instruction
          setMessage(`✅ Login successful! Click here to continue: ${DASHBOARD_URL}`);
          // Create a clickable link as last resort
          setTimeout(() => {
            const link = document.createElement('a');
            link.href = DASHBOARD_URL;
            link.target = "_self";
            link.click();
          }, 1000);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!formData.email || !formData.password) {
      setMessage("⚠️ Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/login`, // backend login route from config
        {
          email: formData.email,
          password: formData.password,
        },
        {
          timeout: 10000, // 10 second timeout
          headers: { 
            "Content-Type": "application/json",
            // Add CORS headers if needed
            "Access-Control-Allow-Origin": "*"
          },
        }
      );

      console.log("Login response:", res.data); // Debug log

      // Check for successful response (be more flexible with success conditions)
      if (res.data.message === "Login successful" || 
          res.status === 200 || 
          res.status === 201 || 
          res.data.success === true) {
        
        setMessage("🎉 Login successful! Redirecting...");

        // Save token in localStorage/sessionStorage
        if (res.data.token) {
          if (formData.rememberMe) {
            localStorage.setItem("authToken", res.data.token);
            localStorage.setItem("rememberMe", "true");
          } else {
            sessionStorage.setItem("authToken", res.data.token);
          }
        }

        // Save user info if provided
        if (res.data.user) {
          const storage = formData.rememberMe ? localStorage : sessionStorage;
          storage.setItem("userData", JSON.stringify(res.data.user));
        }

        // Store login time
        const storage = formData.rememberMe ? localStorage : sessionStorage;
        storage.setItem("loginTime", new Date().toISOString());

        // Redirect after a short delay to show success message
        setTimeout(() => {
          redirectToMainApp();
        }, 1500);

      } else {
        setMessage(res.data.message || "⚠️ Something went wrong during login.");
      }
    } catch (err) {
      console.error("Login error:", err); // Debug log
      
      if (err.code === 'ECONNABORTED') {
        setMessage("⚠️ Request timeout. Please check your connection and try again.");
      } else if (err.response) {
        // Server responded with error status
        const status = err.response.status;
        const errorMessage = err.response.data?.message;
        
        if (status === 401) {
          setMessage("⚠️ Invalid email or password. Please try again.");
        } else if (status === 404) {
          setMessage("⚠️ User not found. Please check your email.");
        } else if (status === 429) {
          setMessage("⚠️ Too many login attempts. Please try again later.");
        } else if (status === 500) {
          setMessage("⚠️ Server error. Please try again later.");
        } else {
          setMessage(errorMessage || `⚠️ Login failed (Error ${status})`);
        }
      } else if (err.request) {
        // Request made but no response received
        setMessage("⚠️ Cannot connect to server. Please check if the backend is running.");
      } else {
        // Something else happened
        setMessage("⚠️ Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5 p-4">
      {/* Title */}
      <div className="text-center mb-5">
        <h2 style={{ color: "#2E2E38" }}>Log In to Your Account</h2>
        <p className="text-muted">Welcome back! Please log in to continue.</p>
      </div>

      {/* Login Form */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="p-4 shadow rounded bg-light">
            {message && (
              <div 
                className={`alert text-center ${
                  message.includes('successful') || message.includes('🎉') ? 'alert-success' : 
                  message.includes('⚠️') ? 'alert-warning' : 'alert-info'
                }`}
              >
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="rememberMe"
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>

              <button
                type="submit"
                className="btn w-100"
                disabled={isLoading}
                style={{
                  background: isLoading 
                    ? "#6c757d" 
                    : "radial-gradient(circle, hsla(40, 100%, 50%, 1) 0%, hsla(54, 100%, 50%, 1) 99%)",
                  color: "#2E2E38",
                  fontWeight: "600",
                }}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Logging in...
                  </>
                ) : (
                  "Log In"
                )}
              </button>
            </form>

            {/* Forgot Password Link */}
            <div className="text-center mt-3">
              <Link to="/forgot-password" className="text-decoration-none text-muted">
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Extra */}
      <div className="text-center mt-4">
        <p className="text-muted">
          Don't have an account?{" "}
          <Link to="/signup" className="text-decoration-none">
            Sign up here
          </Link>
        </p>
      </div>

      {/* Debug Info - Remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-center mt-3">
          <small className="text-muted">
            Debug: Backend: {API_BASE_URL}, Dashboard: {DASHBOARD_URL}
          </small>
        </div>
      )}
    </div>
  );
}

export default Login;
