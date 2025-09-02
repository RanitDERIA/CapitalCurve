import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, DASHBOARD_URL } from '../../config'; // Import correctly

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

  const handleRedirect = () => {
    try {
      console.log("Redirecting to:", DASHBOARD_URL);
      // Since DASHBOARD_URL is an external URL, use window.location
      window.location.href = DASHBOARD_URL;
    } catch (error) {
      console.error("Redirect failed:", error);
      // Fallback: force page replacement
      window.location.replace(DASHBOARD_URL);
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
        `${API_BASE_URL}/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        { headers: { "Content-Type": "application/json" }, timeout: 10000 }
      );

      if (res.data.message === "Login successful") {
        setMessage("🎉 Login successful! Redirecting to Dashboard...");

        // Choose storage type based on rememberMe
        const storage = formData.rememberMe ? localStorage : sessionStorage;

        // Save token
        if (res.data.token) {
          storage.setItem("authToken", res.data.token);
          if (formData.rememberMe) {
            storage.setItem("rememberMe", "true");
          }
        }

        // Save user data
        if (res.data.user) {
          storage.setItem("userData", JSON.stringify(res.data.user));
        }

        // Store login time
        storage.setItem("loginTime", new Date().toISOString());

        // Ensure storage operations are complete before redirect
        setTimeout(() => {
          handleRedirect();
        }, 1000); // Reduced timeout for better UX

      } else {
        setMessage(res.data.message || "⚠️ Something went wrong during login.");
      }

    } catch (err) {
      console.error("Login error:", err);
      if (err.code === "ECONNABORTED") {
        setMessage("⚠️ Request timeout.");
      } else if (err.response) {
        setMessage(err.response.data?.message || "⚠️ Login failed.");
      } else {
        setMessage("⚠️ Cannot connect to server. Please check backend.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5 p-4">
      <div className="text-center mb-5">
        <h2 style={{ color: "#2E2E38" }}>Log In to Your Account</h2>
        <p className="text-muted">Welcome back! Please log in to continue.</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="p-4 shadow rounded bg-light">
            {message && (
              <div
                className={`alert text-center ${
                  message.includes("successful") ? "alert-success" : "alert-warning"
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
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="text-center mt-3">
              <Link to="/forgot-password" className="text-decoration-none text-muted">
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-muted">
          Don't have an account?{" "}
          <Link to="/signup" className="text-decoration-none">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
