import React from 'react';
import { Link } from 'react-router-dom';

export default function FileNotFound() {
  return (
    <div className="form-container">
      <div className="text-center animate-fade-in">
        {/* 404 Illustration */}
        <div className="mb-8">
          <span className="text-9xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            404
          </span>
        </div>

        {/* Icon */}
        <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center text-5xl">
          🔍
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/profile" className="btn btn-primary">
            🏠 Go to Dashboard
          </Link>
          <Link to="/jobs" className="btn btn-secondary">
            💼 Browse Jobs
          </Link>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-gray-400">
          Need help? <Link to="/login" className="text-blue-600 hover:underline">Contact support</Link>
        </p>
      </div>
    </div>
  );
}