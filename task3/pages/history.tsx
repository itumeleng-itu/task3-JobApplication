import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import { applicationsApi, type Application } from '../src/services/api';

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

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'approved': return 'status-badge status-approved';
      case 'rejected': return 'status-badge status-rejected';
      default: return 'status-badge status-pending';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return '';
      case 'rejected': return '';
      default: return '';
    }
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  return (
    <div className="page-container">
      <Sidebar />
      
      <main className="main-content">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Application History</h1>
          <p className="text-gray-500">Track the status of your job applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card text-center">
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
            <p className="text-sm text-gray-500">Total</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-sm text-gray-500">Pending</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
            <p className="text-sm text-gray-500">Approved</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
            <p className="text-sm text-gray-500">Rejected</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'pending', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
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
          <div className="empty-state">
            <div className="text-4xl mb-4">Loading...</div>
            <h3>Loading applications...</h3>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="empty-state">
            <div className="text-2xl mb-4">No Applications</div>
            <h3>
              {filter === 'all' 
                ? 'No applications yet' 
                : `No ${filter} applications`}
            </h3>
            <p className="mb-4">
              {filter === 'all'
                ? 'Start applying to jobs to track your progress here'
                : 'Try changing your filter or apply to more jobs'}
            </p>
            <a href="/jobs" className="btn btn-primary">
              Browse Jobs
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app, index) => (
              <div
                key={index}
                className="application-card animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="application-info">
                  <h3>{app.name}</h3>
                  <p>Applied on {new Date(app.date).toLocaleDateString('en-ZA', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}</p>
                </div>
                <span className={getStatusClass(app.status)}>
                  {getStatusIcon(app.status)} {app.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
