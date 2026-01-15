import { Link } from 'react-router-dom';

export default function FileNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-8">
      <div className="text-center animate-fade-in max-w-md">
        {/* 404 Illustration */}
        <div className="mb-8">
          <span className="text-9xl font-black text-gray-900">
            404
          </span>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-10 leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/profile" className="px-8 py-4 bg-gray-900 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity">
            Go to Dashboard
          </Link>
          <Link to="/jobs" className="px-8 py-4 bg-gray-100 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors">
            Browse Jobs
          </Link>
        </div>

        {/* Help Text */}
        <p className="mt-10 text-sm text-gray-400">
          Need help? <Link to="/login" className="text-blue-600 hover:underline underline-offset-4 font-medium">Contact support</Link>
        </p>
      </div>
    </div>
  );
}