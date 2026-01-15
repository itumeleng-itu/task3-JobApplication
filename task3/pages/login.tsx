import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { usersApi } from "../src/services/api";

export default function Login() {
  const nav = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Try API login first
      const user = await usersApi.login(userData.name, userData.password);
      
      if (user) {
        nav("/profile");
      } else {
        // Fallback to localStorage check
        const myData = localStorage.getItem("signInData");
        if (myData) {
          const savedUserData = JSON.parse(myData);
          if (savedUserData.name === userData.name && savedUserData.password === userData.password) {
            nav("/profile");
            return;
          }
        }
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card animate-fade-in">
        {/* Logo/Brand */}
        <div className="form-header">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
            Login
          </div>
          <h2>Welcome Back</h2>
          <p>View available jobs tailored for you, near you</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your username"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full mt-4"
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? (
              <>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <hr className="form-divider" />

        <p className="form-footer">
          Not a member yet? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
