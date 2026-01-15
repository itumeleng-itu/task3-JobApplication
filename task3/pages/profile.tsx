import { useState, useEffect } from 'react';
import Sidebar from "./sidebar";
import DashboardHeader from "../src/components/DashboardHeader";
import ProfileOverview from "../src/components/ProfileOverview";
import StatCard from "../src/components/StatCard";
import QuickAction from "../src/components/QuickAction";
import { applicationsApi } from "../src/services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Get username from localStorage (set during login)
    const signInData = localStorage.getItem("signInData");
    if (signInData) {
      const parsed = JSON.parse(signInData);
      // The name field contains the username from login
      setUsername(parsed.name || parsed.username || "User");
    }

    // Fetch application stats
    const fetchStats = async () => {
      try {
        const apps = await applicationsApi.getAll();
        setStats({
          total: apps.length,
          pending: apps.filter(a => a.status === 'pending').length,
          approved: apps.filter(a => a.status === 'approved').length,
          rejected: apps.filter(a => a.status === 'rejected').length
        });
      } catch {
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

  return (
    <div className="flex min-h-screen w-full bg-white">
      <Sidebar />
      
      <main className="flex-1 p-6 md:p-12 md:ml-[200px] bg-white transition-all duration-300">
        <DashboardHeader username={username} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {/* Profile Overview - spans 1 column, 2 rows */}
          <div className="lg:row-span-2">
            <ProfileOverview />
          </div>

          {/* Stats Grid - 2x2 */}
          <StatCard label="Total aplications" value={stats.total} />
          <StatCard label="Pending" value={stats.pending} />
          <StatCard label="Approved" value={stats.approved} />
          <StatCard label="Rejected" value={stats.rejected} />
        </div>

        {/* Quick Actions */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-black mb-4">Quick actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickAction label="Browse Jobs" href="/jobs" />
            <QuickAction label="My Jobs" href="/myJobs" />
            <QuickAction label="History" href="/history" />
            <QuickAction label="Add details" href="/addDetails" />
          </div>
        </div>
      </main>
    </div>
  );
}
