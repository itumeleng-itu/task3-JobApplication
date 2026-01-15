import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../src/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../src/components/ui/alert-dialog";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const data = localStorage.getItem("signInData");
  if (!data) return null;
  const myData = JSON.parse(data);
  const date = new Date();

  const menuItems = [
    { label: "Dashboard", route: "/profile", icon: "" },
    { label: "Upload Details", route: "/addDetails", icon: "" },
    { label: "All Jobs", route: "/jobs", icon: "" },
    { label: "My Jobs", route: "/myJobs", icon: "" },
    { label: "Application History", route: "/history", icon: "" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn md:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {isOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <>
              <path d="M3 12h18M3 6h18M3 18h18" />
            </>
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="sidebar-header">
          <h3>Welcome back, {myData.name}!</h3>
          <p>{date.toLocaleDateString('en-ZA', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`sidebar-btn ${location.pathname === item.route ? 'active' : ''}`}
              onClick={() => {
                navigate(item.route);
                setIsOpen(false);
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer with Logout */}
        <div className="sidebar-footer">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="logout-btn">
                Logout
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white rounded-xl p-6 max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-bold text-gray-900">
                  Confirm Logout
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600 mt-2">
                  Are you sure you want to logout? You will need to sign in again to access your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex justify-end gap-3 mt-6">
                <AlertDialogCancel className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="px-5 py-2.5 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium transition-colors"
                  onClick={() => {
                    localStorage.removeItem("signInData");
                    navigate("/login");
                  }}
                >
                  Yes, Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </aside>
    </>
  );
}
