import { useState, type ChangeEvent, type FormEvent } from "react";
import Sidebar from "./sidebar";
import PageHeader from "../src/components/PageHeader";
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
    "IT", "Finance", "Marketing", "HR", "Human Resources", "Operations",
    "Design", "Legal", "Business Intelligence", "Supply Chain", "Communications",
    "Compliance", "Customer Service"
  ];

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  }

  function saveDetails(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const myData = { address: userData.address, department: userData.department };
      localStorage.setItem("cv", JSON.stringify(myData));
      setIsLoading(false);
      nav("/myJobs");
    }, 500);
  }

  return (
    <div className="flex min-h-screen w-full bg-white">
      <Sidebar />
      
      <main className="flex-1 p-6 md:p-12 md:ml-[200px] bg-white transition-all duration-300">
        <PageHeader />

        <div className="max-w-xl mx-auto">
          <div className="bg-gray-200 rounded-2xl p-8">
            <form onSubmit={saveDetails} className="space-y-6">
              <div>
                <label className="block text-xs uppercase font-black text-black mb-2">Full Names</label>
                <input
                  type="text"
                  name="fullnames"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-black"
                  placeholder="Enter your full name"
                  value={userData.fullnames}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-black text-black mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-black"
                  placeholder="Enter your email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-black text-black mb-2">Gender</label>
                <div className="flex gap-8">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="gender" value="male" checked={userData.gender === "male"} onChange={handleChange} className="w-5 h-5" required />
                    <span className="text-black font-medium">Male</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="gender" value="female" checked={userData.gender === "female"} onChange={handleChange} className="w-5 h-5" />
                    <span className="text-black font-medium">Female</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-black text-black mb-2">Address (include city)</label>
                <textarea
                  name="address"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-black min-h-24 resize-none"
                  placeholder="e.g. 123 Main Street, Sandton, Johannesburg"
                  value={userData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-black text-black mb-2">Preferred Department</label>
                <select
                  name="department"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-black"
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

              <button 
                type="submit" 
                className="w-full py-4 bg-black text-white text-sm font-bold rounded-xl"
                disabled={isLoading}
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
