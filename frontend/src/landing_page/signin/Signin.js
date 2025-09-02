import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL, DASHBOARD_URL } from "../config"; // import from your config.js

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

  const redirectToDashboard = () => {
    window.location.assign(DASHBOARD_URL);
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
        `${BACKEND_URL}/auth/signin`, // use deployed backend
        {
          email: formData.email,
          password: formData.password,
        },
        {
          timeout: 10000,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (
        res.data.message === "Login successful" ||
        res.status === 200 ||
        res.status === 201
      ) {
        setMessage("🎉 Login successful! Redirecting...");
        
        // Save token
        if (res.data.token) {
          if (formData.rememberMe) {
            localStorage.setItem("authToken", res.data.token);
          } else {
            sessionStorage.setItem("authToken", res.data.token);
          }
        }

        // Save user info if provided
        if (res.data.user) {
          const storage = formData.rememberMe ? localStorage : sessionStorage;
          storage.setItem("userData", JSON.stringify(res.data.user));
        }

        // Redirect after short delay
        setTimeout(() => {
          redirectToDashboard();
        }, 1500);
      } else {
        setMessage(res.data.message || "⚠️ Something went wrong.");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.code === "ECONNABORTED") {
        setMessage("⚠️ Request timeout. Please check your connection.");
      } else if (err.response) {
        const status = err.response.status;
        if (status === 401) setMessage("⚠️ Invalid email or password.");
        else if (status === 404) setMessage("⚠️ User not found.");
        else setMessage(err.response.data?.message || `⚠️ Error ${status}`);
      } else if (err.request) {
        setMessage("⚠️ Cannot connect to backend. Check your server URL.");
      } else {
        setMessage("⚠️ Login failed. Try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5 p-4">
      <div className="text-center mb-5">
        <h2 style={{ color: "#2E2E38" }}>Log In</h2>
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
                  name="rememberMe"
                  className="form-check-input"
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
                {isLoading ? "Logging In..." : "Log In"}
              </button>
            </form>

            <div className="text-center mt-3">
              <Link to="/signup" className="text-decoration-none text-muted">
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
