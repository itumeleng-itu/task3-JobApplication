import React, { useState, useEffect } from 'react';
import Sidebar from "./sidebar";
import AutoAlert from "../src/components/ui/auto-dismiss";
import { applicationsApi } from "../src/services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apps = await applicationsApi.getAll();
        setStats({
          total: apps.length,
          pending: apps.filter(a => a.status === 'pending').length,
          approved: apps.filter(a => a.status === 'approved').length,
          rejected: apps.filter(a => a.status === 'rejected').length
        });
      } catch (error) {
        // Fallback to localStorage
        const saved = localStorage.getItem('jobApplications');
        if (saved) {
          const apps = JSON.parse(saved);
          setStats({
            total: apps.length,
            pending: apps.filter((a: any) => a.status === 'pending').length,
            approved: apps.filter((a: any) => a.status === 'approved').length,
            rejected: apps.filter((a: any) => a.status === 'rejected').length
          });
        }
      }
    };

    fetchStats();
  }, []);

  const dashboardCards = [
    {
      title: "What is a Job Application Tracker?",
      content: "A job application tracker helps you organize and monitor your job search process. Track applications, follow up on leads, and stay organized throughout your career journey.",
      icon: ""
    },
    {
      title: "Why Use This App?",
      content: "Stay organized, never miss a follow-up, and gain insights into your job search progress. Our tracker helps you manage multiple applications efficiently.",
      icon: ""
    },
    {
      title: "Key Features",
      items: [
        "Track application status (Pending, Approved, Rejected)",
        "Search and filter available jobs",
        "Personalized job recommendations",
        "Application history with statistics"
      ],
      icon: ""
    },
    {
      title: "Getting Started",
      items: [
        "Complete your profile with job preferences",
        "Browse available positions",
        "Apply with one click",
        "Track your progress in real-time"
      ],
      icon: ""
    }
  ];

  return (
    <div className="page-container">
      <AutoAlert message="Welcome back! You have logged in successfully." duration={3000} />
      
      <Sidebar />
      
      <main className="main-content">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
          <p className="text-gray-500">Welcome to your Job Application Tracker</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card bg-blue-600 text-white">
            <p className="text-3xl font-bold">{stats.total}</p>
            <p className="text-blue-100">Total Applications</p>
          </div>
          <div className="card bg-yellow-500 text-white">
            <p className="text-3xl font-bold">{stats.pending}</p>
            <p className="text-yellow-100">Pending</p>
          </div>
          <div className="card bg-green-500 text-white">
            <p className="text-3xl font-bold">{stats.approved}</p>
            <p className="text-green-100">Approved</p>
          </div>
          <div className="card bg-red-500 text-white">
            <p className="text-3xl font-bold">{stats.rejected}</p>
            <p className="text-red-100">Rejected</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/jobs" className="card hover:border-blue-300 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-sm font-bold text-blue-600">
                Jobs
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Browse Jobs</h3>
                <p className="text-sm text-gray-500">Find opportunities</p>
              </div>
            </a>
            <a href="/addDetails" className="card hover:border-blue-300 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-sm font-bold text-green-600">
                Profile
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Update Profile</h3>
                <p className="text-sm text-gray-500">Add your details</p>
              </div>
            </a>
            <a href="/myJobs" className="card hover:border-blue-300 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-sm font-bold text-purple-600">
                My Jobs
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">My Jobs</h3>
                <p className="text-sm text-gray-500">Personalized matches</p>
              </div>
            </a>
            <a href="/history" className="card hover:border-blue-300 flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-sm font-bold text-orange-600">
                History
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">History</h3>
                <p className="text-sm text-gray-500">Track applications</p>
              </div>
            </a>
          </div>
        </div>

        {/* Info Cards */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">About This App</h2>
        <div className="dashboard-grid">
          {dashboardCards.map((card, index) => (
            <div key={index} className="card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{card.icon}</span>
                <h3 className="font-bold text-gray-800">{card.title}</h3>
              </div>
              {card.content && (
                <p className="text-gray-600 leading-relaxed">{card.content}</p>
              )}
              {card.items && (
                <ul className="space-y-2">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <span className="text-blue-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
