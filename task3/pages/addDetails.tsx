import React, { useState, type ChangeEvent,  type FormEvent } from "react";
import Sidebar from "./sidebar";
import { useNavigate } from "react-router-dom";

export default function UserDetails() {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    fullnames: "",
    email: "",
    gender: "",
    address: "",
    department: "",
  });

  const departments = [
    "IT",
    "Finance",
    "Marketing",
    "HR",
    "Human Resources",
    "Operations",
    "Design",
    "Legal",
    "Business Intelligence",
    "Supply Chain",
    "Communications",
    "Compliance",
    "Customer Service"
  ];

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function saveDetails(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const myData = {
        address: userData.address,
        department: userData.department
      };
      localStorage.setItem("cv", JSON.stringify(myData));
      setIsLoading(false);
      nav("/myJobs");
    }, 500);
  }

  return (
    <div className="page-container">
      <Sidebar />
      
      <main className="main-content">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="page-header text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
              Profile
            </div>
            <h1 className="page-title">Complete Your Profile</h1>
            <p className="text-gray-500">Add your details to get personalized job recommendations</p>
          </div>

          {/* Form Card */}
          <div className="card animate-fade-in">
            <form onSubmit={saveDetails} className="space-y-6">
              {/* Full Names */}
              <div className="form-group">
                <label className="form-label">Full Names</label>
                <input
                  type="text"
                  name="fullnames"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={userData.fullnames}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Gender */}
              <div className="form-group">
                <label className="form-label">Gender</label>
                <div className="flex gap-6 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={userData.gender === "male"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600"
                      required
                    />
                    <span className="text-gray-700">Male</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={userData.gender === "female"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700">Female</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={userData.gender === "other"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700">Other</span>
                  </label>
                </div>
              </div>

              {/* Address */}
              <div className="form-group">
                <label className="form-label">Address (include city name)</label>
                <textarea
                  name="address"
                  className="form-input min-h-24 resize-none"
                  placeholder="e.g. 123 Main Street, Sandton, Johannesburg"
                  value={userData.address}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  Include your city name at the end for better job matching
                </p>
              </div>

              {/* Department */}
              <div className="form-group">
                <label className="form-label">Preferred Department</label>
                <select
                  name="department"
                  className="form-input"
                  value={userData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  Choose the department that matches your skills and interests
                </p>
              </div>

              <hr className="form-divider" />

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-primary w-full"
                disabled={isLoading}
                style={{ opacity: isLoading ? 0.7 : 1 }}
              >
                {isLoading ? (
                  <>
                    Saving...
                  </>
                ) : (
                  <>
                    Save & Find Jobs →
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <h4 className="font-semibold text-blue-800 mb-2">Why we need this information</h4>
            <p className="text-sm text-blue-700">
              Your address and department preferences help us show you relevant job opportunities 
              in your area and field of expertise. We'll match you with positions that align with 
              your career goals.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
