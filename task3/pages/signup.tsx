import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usersApi } from "../src/services/api";

type SignupFormData = {
  username: string;
  email: string;
  password: string;
  password2: string;
};

export default function Signup() {
  const nav = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.password2) {
      setError("Passwords do not match");
      return;
    }

    // Validate password length
    if (formData.password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    setIsLoading(true);

    try {
      // Register via API
      const user = await usersApi.register({
        name: formData.username,
        email: formData.email,
        password: formData.password
      });

      if (user) {
        nav("/login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
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
            Sign Up
          </div>
          <h2>Create Account</h2>
          <p>We've made job hunting easier for you</p>
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
              name="username"
              className="form-input"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="password2"
              className="form-input"
              placeholder="Re-enter your password"
              value={formData.password2}
              onChange={handleChange}
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
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <hr className="form-divider" />

        <p className="form-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
