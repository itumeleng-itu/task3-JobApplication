import React, { useEffect, useState } from "react";
import Job from "./Job";
import Sidebar from "./sidebar";
import noJobImg from "../src/assets/image/nojob.png";
import { motion } from "motion/react";

const jobs = [
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
  { id: 25, title: "IT Security Specialist", department: "IT", location: "Polokwane", salary: "R53,000/m" },
];

export default function MyJobs() {
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const details = localStorage.getItem("cv");
  if (!details) return null;

  const det = JSON.parse(details);
  const depart = det.department;
  const location = det.address;
  const city = location.trim().split(" ").slice(-1)[0]; // get last word (city)


  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const results = jobs.filter(
      (job) =>
        job.department.toLowerCase() === depart.trim().toLowerCase() ||
        job.location.toLowerCase() === city.toLowerCase()
    );

    setFilteredJobs(results);
  }, [depart, city]);

  return (
    <div className="min-h-screen bg-white w-auto">
        <div className="fixed top-0 left-0 h-screen w-75 bg-black text-white p-5 hidden md:flex flex-col border-r border-black">
          <Sidebar />
        </div>
    
        <div className="md:ml-100 p-10 md:p-10">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
            Available Jobs
          </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
          }}
        >
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Job
                key={job.id}
                id={job.id}
                title={job.title}
                department={job.department}
                location={job.location}
                salary={job.salary}
              />
            ))
          ) : (
            <div className="flex items-center justify-center col-span-4 py-10">
              <motion.div
                animate={{
                  x: [-20, 20, -20],
                  rotate: [-10, 10, -10],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="origin-top"
              >
                <img src={noJobImg} alt="no jobs" className="w-150" />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
