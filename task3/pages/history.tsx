import { useState, useEffect } from 'react';
import Sidebar from './sidebar';
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
        // Try API first
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
          // Fallback to localStorage
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
      } catch (error) {
        // Fallback to localStorage
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
      case 'approved': return 'bg-emerald-100 text-emerald-700';
      case 'rejected': return 'bg-rose-100 text-rose-700';
      default: return 'bg-amber-100 text-amber-700';
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
      
      <main className="flex-1 p-6 md:p-12 md:ml-[280px] bg-white transition-all duration-300">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">Application History</h1>
          <p className="text-gray-500 font-medium">Track the status of your job applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
            <p className="text-4xl font-black text-blue-600">{stats.total}</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Total</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
            <p className="text-4xl font-black text-amber-500">{stats.pending}</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Pending</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
            <p className="text-4xl font-black text-emerald-500">{stats.approved}</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Approved</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
            <p className="text-4xl font-black text-rose-500">{stats.rejected}</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Rejected</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {['all', 'pending', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                filter === status
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== 'all' && (
                <span className="ml-2 opacity-70">
                  ({stats[status as keyof typeof stats]})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-4xl mb-4 animate-pulse">Loading...</div>
            <h3 className="text-xl font-bold text-gray-900">Loading applications...</h3>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-2xl mb-4 text-gray-400">No Applications</div>
            <h3 className="text-xl font-bold text-gray-900">
              {filter === 'all' 
                ? 'No applications yet' 
                : `No ${filter} applications`}
            </h3>
            <p className="text-gray-500 mt-2 mb-6">
              {filter === 'all'
                ? 'Start applying to jobs to track your progress here'
                : 'Try changing your filter or apply to more jobs'}
            </p>
            <a href="/jobs" className="px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity">
              Browse Jobs
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-between gap-4 shadow-sm animate-fade-in hover:border-gray-200 transition-all"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">{app.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Applied on {new Date(app.date).toLocaleDateString('en-ZA', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}</p>
                </div>
                <span className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider ${getStatusClasses(app.status)}`}>
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
