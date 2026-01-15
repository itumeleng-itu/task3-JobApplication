import { useState, type ChangeEvent, type FormEvent } from "react";
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
    <div className="flex min-h-screen w-full bg-white">
      <Sidebar />
      
      <main className="flex-1 p-6 md:p-12 md:ml-[280px] bg-white transition-all duration-300">
        <div className="max-w-xl mx-auto py-10">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-3">Complete Your Profile</h1>
            <p className="text-gray-500 font-medium">Add your details to get personalized job recommendations</p>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-gray-100 shadow-2xl p-10 rounded-3xl animate-fade-in">
            <form onSubmit={saveDetails} className="space-y-6">
              {/* Full Names */}
              <div>
                <label className="block text-[10px] uppercase font-black text-black mb-2 tracking-widest">Full Names</label>
                <input
                  type="text"
                  name="fullnames"
                  className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl text-sm transition-all focus:outline-none focus:border-blue-500 focus:bg-white"
                  placeholder="Enter your full name"
                  value={userData.fullnames}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] uppercase font-black text-black mb-2 tracking-widest">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl text-sm transition-all focus:outline-none focus:border-blue-500 focus:bg-white"
                  placeholder="Enter your email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-[10px] uppercase font-black text-black mb-3 tracking-widest">Gender</label>
                <div className="flex gap-8">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={userData.gender === "male"}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-600 border-2 border-gray-200 accent-blue-600"
                      required
                    />
                    <span className="text-gray-600 group-hover:text-blue-600 transition-colors font-medium">Male</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={userData.gender === "female"}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-600 border-2 border-gray-200 accent-blue-600"
                    />
                    <span className="text-gray-600 group-hover:text-blue-600 transition-colors font-medium">Female</span>
                  </label>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-[10px] uppercase font-black text-black mb-2 tracking-widest">Address (include city name)</label>
                <textarea
                  name="address"
                  className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl text-sm transition-all focus:outline-none focus:border-blue-500 focus:bg-white min-h-24 resize-none"
                  placeholder="e.g. 123 Main Street, Sandton, Johannesburg"
                  value={userData.address}
                  onChange={handleChange}
                  required
                />
                <p className="text-[10px] text-gray-400 mt-2 font-medium">
                  Include your city name at the end for better job matching
                </p>
              </div>

              {/* Department */}
              <div>
                <label className="block text-[10px] uppercase font-black text-black mb-2 tracking-widest">Preferred Department</label>
                <select
                  name="department"
                  className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl text-sm transition-all focus:outline-none focus:border-blue-500 focus:bg-white appearance-none"
                  value={userData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full py-4 bg-gray-900 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity mt-4"
                disabled={isLoading}
                style={{ opacity: isLoading ? 0.7 : 1 }}
              >
                {isLoading ? 'Saving...' : 'Save & Find Jobs'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
