import { useState, useEffect } from "react";
import Job from "./Job";
import Sidebar from "./sidebar";
import PageHeader from "../src/components/PageHeader";
import { jobsApi, type Job as JobType } from "../src/services/api";

const fallbackJobs: JobType[] = [
  { id: 1, title: "Software Engineer", department: "IT", location: "Johannesburg", salary: "R45,000/m" },
  { id: 2, title: "Data Analyst", department: "Business Intelligence", location: "Cape Town", salary: "R35,000/m" },
  { id: 3, title: "Project Manager", department: "Operations", location: "Pretoria", salary: "R50,000/m" },
  { id: 4, title: "UI/UX Designer", department: "Design", location: "Durban", salary: "R40,000/m" },
  { id: 5, title: "Network Administrator", department: "IT", location: "Bloemfontein", salary: "R38,000/m" },
  { id: 6, title: "Digital Marketing Specialist", department: "Marketing", location: "Port Elizabeth", salary: "R32,000/m" },
  { id: 7, title: "Human Resources Officer", department: "HR", location: "Polokwane", salary: "R30,000/m" },
  { id: 8, title: "Financial Accountant", department: "Finance", location: "Nelspruit", salary: "R48,000/m" },
];

export default function AddJob() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      } catch {
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
    if (e.key === "Enter") handleSearch();
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredJobs(jobs);
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      <Sidebar />
      
      <main className="flex-1 p-6 md:p-12 md:ml-[200px] bg-white transition-all duration-300">
        <PageHeader />

        {/* Search Bar */}
        <div className="flex gap-4 mb-8 items-center flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <input
              type="search"
              placeholder="Search by location, title, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl text-sm focus:outline-none focus:border-black"
            />
          </div>
          <button onClick={handleSearch} className="px-8 py-3 bg-black text-white text-sm font-bold rounded-xl">
            Search
          </button>
          {searchTerm && (
            <button onClick={clearSearch} className="px-6 py-3 bg-gray-200 text-black text-sm font-bold rounded-xl">
              Clear
            </button>
          )}
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-xl font-bold text-black">Loading jobs...</p>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Job key={job.id} id={job.id} title={job.title} department={job.department} location={job.location} salary={job.salary} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-xl font-bold text-black mb-4">No jobs found</p>
            <button onClick={clearSearch} className="px-6 py-3 bg-black text-white text-sm font-bold rounded-xl">
              Show All Jobs
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
