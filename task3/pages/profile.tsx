import { useState, useEffect } from 'react';
import Sidebar from "./sidebar";
import PageHeader from "../src/components/PageHeader";
import ProfileOverview from "../src/components/ProfileOverview";
import StatCard from "../src/components/StatCard";
import QuickAction from "../src/components/QuickAction";
import { applicationsApi } from "../src/services/api";
import { 
  GoogleDocIcon, 
  Loading01Icon, 
  CheckmarkCircle03Icon, 
  CancelCircleIcon,
  Briefcase01Icon,
  UserIcon,
  Clock01Icon,
  FileAddIcon
} from "@hugeicons/core-free-icons";

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
      } catch {
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
        <PageHeader />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:row-span-2">
            <ProfileOverview />
          </div>
          <StatCard label="Total aplications" value={stats.total} icon={GoogleDocIcon} />
          <StatCard label="Pending" value={stats.pending} icon={Loading01Icon} />
          <StatCard label="Approved" value={stats.approved} icon={CheckmarkCircle03Icon} />
          <StatCard label="Rejected" value={stats.rejected} icon={CancelCircleIcon} />
        </div>

        {/* Quick Actions */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-black mb-4">Quick actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickAction label="Browse Jobs" href="/jobs" icon={Briefcase01Icon} />
            <QuickAction label="My Jobs" href="/myJobs" icon={UserIcon} />
            <QuickAction label="History" href="/history" icon={Clock01Icon} />
            <QuickAction label="Add details" href="/addDetails" icon={FileAddIcon} />
          </div>
        </div>
      </main>
    </div>
  );
}
