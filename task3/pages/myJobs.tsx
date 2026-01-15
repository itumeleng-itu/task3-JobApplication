import React, { useEffect, useState } from "react";
import Job from "./Job";
import Sidebar from "./sidebar";
import { jobsApi, type Job as JobType } from "../src/services/api";
import { motion } from "motion/react";

// Fallback jobs data
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

export default function MyJobs() {
  const [filteredJobs, setFilteredJobs] = useState<JobType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<{ department: string; city: string } | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      
      // Get user details
      const details = localStorage.getItem("cv");
      if (!details) {
        setIsLoading(false);
        return;
      }

      const det = JSON.parse(details);
      const depart = det.department;
      const location = det.address;
      const city = location.trim().split(" ").slice(-1)[0];
      
      setUserDetails({ department: depart, city });

      try {
        // Fetch all jobs from API
        let jobs = await jobsApi.getAll();
        if (jobs.length === 0) {
          jobs = fallbackJobs;
        }

        // Filter jobs based on user's department or location
        const results = jobs.filter(
          (job) =>
            job.department.toLowerCase() === depart.trim().toLowerCase() ||
            job.location.toLowerCase() === city.toLowerCase()
        );

        setFilteredJobs(results);
      } catch (error) {
        // Use fallback and filter
        const results = fallbackJobs.filter(
          (job) =>
            job.department.toLowerCase() === depart.trim().toLowerCase() ||
            job.location.toLowerCase() === city.toLowerCase()
        );
        setFilteredJobs(results);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Check if user has uploaded details
  const details = localStorage.getItem("cv");
  if (!details) {
    return (
      <div className="page-container">
        <Sidebar />
        <main className="main-content">
          <div className="empty-state">
            <div className="text-6xl mb-4"></div>
            <h3>Complete Your Profile First</h3>
            <p className="mb-4">Upload your details to see personalized job recommendations</p>
            <a href="/addDetails" className="btn btn-primary">
              Upload Details
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Sidebar />
      
      <main className="main-content">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Recommended Jobs</h1>
          <p className="text-gray-500">
            Jobs matching your profile
            {userDetails && (
              <span className="ml-2">
                • <span className="font-medium text-blue-600">{userDetails.department}</span> department 
                or in <span className="font-medium text-blue-600">{userDetails.city}</span>
              </span>
            )}
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="empty-state">
            <div className="text-4xl mb-4">Loading...</div>
            <h3>Finding your perfect match...</h3>
            <p>We're searching for jobs that match your profile</p>
          </div>
        ) : filteredJobs.length > 0 ? (
          <>
            {/* Results Count */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-blue-800">
                We found <strong>{filteredJobs.length}</strong> jobs that match your profile!
              </p>
            </div>

            <div className="jobs-grid">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Job
                    id={job.id}
                    title={job.title}
                    department={job.department}
                    location={job.location}
                    salary={job.salary}
                  />
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <motion.div
              animate={{
                y: [-10, 10, -10],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="text-2xl mb-4">No Results</div>
            </motion.div>
            <h3>No matching jobs found</h3>
            <p className="mb-4">
              We couldn't find jobs matching your {userDetails?.department} department 
              or in {userDetails?.city}
            </p>
            <a href="/jobs" className="btn btn-primary">
              Browse All Jobs
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
