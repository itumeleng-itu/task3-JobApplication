import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  // Get user data
  const data = localStorage.getItem("signInData");

  const menuItems = [
    { label: "Dashboard", route: "/profile" },
    { label: "Browse Jobs", route: "/jobs" },
    { label: "My Jobs", route: "/myJobs" },
    { label: "History", route: "/history" },
    { label: "Add Details", route: "/addDetails" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("signInData");
    localStorage.removeItem("cv");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="fixed top-4 left-4 z-[200] p-3 bg-black text-white rounded-xl md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {isOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-[150] md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-[200px] bg-black text-white flex flex-col z-[160] transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        {/* Logo */}
        <div className="p-6 pb-8">
          <h1 className="text-xl font-bold">JobApliTrack</h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-4 flex-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center gap-3 px-3 py-2.5 text-left text-sm font-medium rounded-lg transition-colors ${
                location.pathname === item.route
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => {
                navigate(item.route);
                setIsOpen(false);
              }}
            >
              <Home size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 mt-auto">
          <button 
            onClick={() => navigate('/about')}
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-400 hover:text-white w-full"
          >
            <Home size={16} />
            About
          </button>
          <button 
            onClick={handleLogout}
            className="w-full mt-4 py-2.5 bg-red-500 text-white text-sm font-bold rounded-lg hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
