import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ToggleSwitch from "../components/ToggleSwitch";

const LoginScreen = ({ onSwitchToHome }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("customer");
  const { login, switchRole, user } = useAuth();

  const roleOptions = [
    { value: "customer", label: "Customer" },
    { value: "vendor", label: "Vendor" },
    { value: "admin", label: "Admin" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password, selectedRole);
      onSwitchToHome(); // Switch to home screen after successful login
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="card-header">
        <h2 className="card-title text-center">CTC Market</h2>
        <p className="card-slogan text-center">Fresh Produce, Feed Everyone</p>
      </div>
      <div className="card-body">
        <div className="login-toggle-container text-center mb-4">
          <p className="toggle-label mb-2">I am a:</p>
          <ToggleSwitch
            options={roleOptions}
            activeOption={selectedRole}
            onChange={setSelectedRole}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div
              className="mb-3 text-center"
              style={{ color: "var(--danger-color)" }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={isLoading}
            style={{ width: "100%" }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Don't have an account?{" "}
            <a href="#" style={{ color: "var(--primary-color)" }}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
