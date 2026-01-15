import { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import PageHeader from '../src/components/PageHeader';
import { applicationsApi } from '../src/services/api';

type JobDetails = {
  id?: number;
  name: string;
  jobTitle?: string;
  date: Date | string;
  status: 'pending' | 'approved' | 'rejected';
};

export default function History() {
  const [applications, setApplications] = useState<JobDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const apiApps = await applicationsApi.getAll();
        if (apiApps.length > 0) {
          const formattedApps = apiApps.map(app => ({
            id: app.id,
            name: app.jobTitle || (app as any).name,
            date: new Date(app.date),
            status: app.status
          }));
          setApplications(formattedApps);
        } else {
          const savedApps = localStorage.getItem('jobApplications');
          if (savedApps) {
            const apps = JSON.parse(savedApps).map((app: any) => ({
              ...app,
              name: app.name || app.jobTitle,
              date: new Date(app.date),
            }));
            setApplications(apps);
          }
        }
      } catch {
        const savedApps = localStorage.getItem('jobApplications');
        if (savedApps) {
          const apps = JSON.parse(savedApps).map((app: any) => ({
            ...app,
            name: app.name || app.jobTitle,
            date: new Date(app.date),
          }));
          setApplications(apps);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      <Sidebar />
      
      <main className="flex-1 p-6 md:p-12 md:ml-[200px] bg-white transition-all duration-300">
        <PageHeader />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-200 rounded-xl p-6 text-center">
            <p className="text-3xl font-black text-black">{stats.total}</p>
            <p className="text-xs font-bold text-gray-600 uppercase">Total</p>
          </div>
          <div className="bg-gray-200 rounded-xl p-6 text-center">
            <p className="text-3xl font-black text-black">{stats.pending}</p>
            <p className="text-xs font-bold text-gray-600 uppercase">Pending</p>
          </div>
          <div className="bg-gray-200 rounded-xl p-6 text-center">
            <p className="text-3xl font-black text-black">{stats.approved}</p>
            <p className="text-xs font-bold text-gray-600 uppercase">Approved</p>
          </div>
          <div className="bg-gray-200 rounded-xl p-6 text-center">
            <p className="text-3xl font-black text-black">{stats.rejected}</p>
            <p className="text-xs font-bold text-gray-600 uppercase">Rejected</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {['all', 'pending', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                filter === status ? 'bg-black text-white' : 'bg-gray-200 text-black'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Applications List */}
        {isLoading ? (
          <div className="py-20 text-center">
            <p className="text-xl font-bold text-black">Loading applications...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-xl font-bold text-black mb-4">No applications yet</p>
            <a href="/jobs" className="px-6 py-3 bg-black text-white text-sm font-bold rounded-xl">
              Browse Jobs
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app, index) => (
              <div key={index} className="bg-gray-200 rounded-xl p-6 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-black text-lg">{app.name}</h3>
                  <p className="text-sm text-gray-600">
                    Applied on {new Date(app.date).toLocaleDateString('en-ZA', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <span className={`px-4 py-2 rounded-lg text-xs font-black uppercase ${getStatusClasses(app.status)}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
