import { useState, useEffect } from "react";
import Job from "./Job";
import Sidebar from "./sidebar";
import { jobsApi, type Job as JobType } from "../src/services/api";

// Fallback jobs data in case API is unavailable
const fallbackJobs: JobType[] = [
  { id: 1, title: "Software Engineer", department: "IT", location: "Johannesburg", salary: "R45,000/m" },
  { id: 2, title: "Data Analyst", department: "Business Intelligence", location: "Cape Town", salary: "R35,000/m" },
  { id: 3, title: "Project Manager", department: "Operations", location: "Pretoria", salary: "R50,000/m" },
  { id: 4, title: "UI/UX Designer", department: "Design", location: "Durban", salary: "R40,000/m" },
  { id: 5, title: "Network Administrator", department: "IT", location: "Bloemfontein", salary: "R38,000/m" },
  { id: 6, title: "Digital Marketing Specialist", department: "Marketing", location: "Port Elizabeth", salary: "R32,000/m" },
  { id: 7, title: "Human Resources Officer", department: "HR", location: "Polokwane", salary: "R30,000/m" },
  { id: 8, title: "Financial Accountant", department: "Finance", location: "Nelspruit", salary: "R48,000/m" },
  { id: 9, title: "Human Resources Officer", department: "Human Resources", location: "Cape Town", salary: "R35,000/m" },
  { id: 10, title: "IT Support Technician", department: "IT", location: "Durban", salary: "R28,000/m" },
  { id: 11, title: "Marketing Coordinator", department: "Marketing", location: "Johannesburg", salary: "R32,500/m" },
  { id: 12, title: "Operations Manager", department: "Operations", location: "Port Elizabeth", salary: "R55,000/m" },
  { id: 13, title: "Systems Analyst", department: "IT", location: "Kimberley", salary: "R42,000/m" },
  { id: 14, title: "Legal Advisor", department: "Legal", location: "Cape Town", salary: "R50,000/m" },
  { id: 15, title: "Procurement Officer", department: "Supply Chain", location: "Mthatha", salary: "R36,000/m" },
  { id: 16, title: "Content Strategist", department: "Marketing", location: "East London", salary: "R34,000/m" },
  { id: 17, title: "Quality Assurance Specialist", department: "Operations", location: "George", salary: "R41,000/m" },
  { id: 18, title: "Recruitment Specialist", department: "HR", location: "Rustenburg", salary: "R33,500/m" },
  { id: 19, title: "Internal Auditor", department: "Finance", location: "Welkom", salary: "R47,000/m" },
  { id: 20, title: "Graphic Designer", department: "Design", location: "Mbombela", salary: "R31,000/m" },
  { id: 21, title: "Customer Service Manager", department: "Customer Service", location: "Gqeberha", salary: "R39,000/m" },
  { id: 22, title: "Risk Manager", department: "Compliance", location: "Bloemfontein", salary: "R52,000/m" },
  { id: 23, title: "Data Engineer", department: "Business Intelligence", location: "Johannesburg", salary: "R60,000/m" },
  { id: 24, title: "Public Relations Officer", department: "Communications", location: "Pretoria", salary: "R37,000/m" },
  { id: 25, title: "IT Security Specialist", department: "IT", location: "Polokwane", salary: "R53,000/m" }
];

export default function AddJob() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch jobs from API on mount
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const apiJobs = await jobsApi.getAll();
        if (apiJobs.length > 0) {
          setJobs(apiJobs);
          setFilteredJobs(apiJobs);
        } else {
          setJobs(fallbackJobs);
          setFilteredJobs(fallbackJobs);
        }
      } catch (error) {
        setJobs(fallbackJobs);
        setFilteredJobs(fallbackJobs);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = () => {
    const lowerSearch = searchTerm.toLowerCase().trim();
    if (!lowerSearch) {
      setFilteredJobs(jobs);
      return;
    }
    
    const results = jobs.filter((job) =>
      job.title.toLowerCase().includes(lowerSearch) ||
      job.department.toLowerCase().includes(lowerSearch) ||
      job.location.toLowerCase().includes(lowerSearch)
    );
    setFilteredJobs(results);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredJobs(jobs);
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      <Sidebar />
      
      <main className="flex-1 p-6 md:p-12 md:ml-[280px] bg-white transition-all duration-300">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">Available Jobs</h1>
          <p className="text-gray-500 font-medium">Find your next career opportunity</p>
        </div>

        {/* Search Bar */}
        <div className="flex gap-4 mb-10 items-center flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <input
              type="search"
              placeholder="Search by location, title, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl text-sm transition-all focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
          <button onClick={handleSearch} className="px-8 py-3 bg-gray-900 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity">
            Search
          </button>
          {searchTerm && (
            <button onClick={clearSearch} className="px-6 py-3 bg-gray-100 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors">
              Clear
            </button>
          )}
        </div>

        {/* Results Count */}
        {!isLoading && (
          <p className="text-gray-500 mb-6 text-sm font-medium">
            Showing {filteredJobs.length} of {jobs.length} jobs
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-4xl mb-4 animate-pulse">Loading...</div>
            <h3 className="text-xl font-bold text-gray-900">Loading jobs...</h3>
            <p className="text-gray-500 mt-2">Please wait while we fetch available positions</p>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Job
                key={job.id}
                id={job.id}
                title={job.title}
                department={job.department}
                location={job.location}
                salary={job.salary}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-2xl mb-4 text-gray-400">No Results</div>
            <h3 className="text-xl font-bold text-gray-900">No jobs found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
            <button onClick={clearSearch} className="mt-6 px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity">
              Show All Jobs
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
