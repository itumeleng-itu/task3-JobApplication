import { useEffect, useState } from "react";
import Job from "./Job";
import Sidebar from "./sidebar";
import PageHeader from "../src/components/PageHeader";
import { jobsApi, type Job as JobType } from "../src/services/api";
import { motion } from "motion/react";

const fallbackJobs: JobType[] = [
  { id: 1, title: "Software Engineer", department: "IT", location: "Johannesburg", salary: "R45,000/m" },
  { id: 2, title: "Data Analyst", department: "Business Intelligence", location: "Cape Town", salary: "R35,000/m" },
  { id: 3, title: "Project Manager", department: "Operations", location: "Pretoria", salary: "R50,000/m" },
  { id: 4, title: "UI/UX Designer", department: "Design", location: "Durban", salary: "R40,000/m" },
  { id: 5, title: "Network Administrator", department: "IT", location: "Bloemfontein", salary: "R38,000/m" },
];

export default function MyJobs() {
  const [filteredJobs, setFilteredJobs] = useState<JobType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<{ department: string; city: string } | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
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
        let jobs = await jobsApi.getAll();
        if (jobs.length === 0) jobs = fallbackJobs;
        const results = jobs.filter(
          (job) =>
            job.department.toLowerCase() === depart.trim().toLowerCase() ||
            job.location.toLowerCase() === city.toLowerCase()
        );
        setFilteredJobs(results);
      } catch {
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

  const details = localStorage.getItem("cv");
  if (!details) {
    return (
      <div className="flex min-h-screen w-full bg-white">
        <Sidebar />
        <main className="flex-1 p-6 md:p-12 md:ml-[200px] bg-white transition-all duration-300">
          <PageHeader />
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-2xl font-bold text-black mb-4">Complete Your Profile First</p>
            <p className="text-gray-500 mb-6">Upload your details to see personalized job recommendations</p>
            <a href="/addDetails" className="px-6 py-3 bg-black text-white text-sm font-bold rounded-xl">
              Upload Details
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-white">
      <Sidebar />
      
      <main className="flex-1 p-6 md:p-12 md:ml-[200px] bg-white transition-all duration-300">
        <PageHeader />

        {userDetails && (
          <p className="text-gray-500 mb-6">
            Matching: <span className="font-bold text-black">{userDetails.department}</span> or <span className="font-bold text-black">{userDetails.city}</span>
          </p>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-xl font-bold text-black">Finding your matches...</p>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Job id={job.id} title={job.title} department={job.department} location={job.location} salary={job.salary} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-xl font-bold text-black mb-4">No matching jobs found</p>
            <a href="/jobs" className="px-6 py-3 bg-black text-white text-sm font-bold rounded-xl">
              Browse All Jobs
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
