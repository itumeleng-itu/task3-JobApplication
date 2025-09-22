import React, { useState } from "react";
import Job from "./Job";
import Sidebar from "./sidebar";
import searchImg from "../media/magnifying-glass.png"

const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    department: "IT",
    location: "Johannesburg",
    salary: "R45,000/m",
  },
  {
    id: 2,
    title: "Data Analyst",
    department: "Business Intelligence",
    location: "Cape Town",
    salary: "R35,000/m",
  },
  {
    id: 3,
    title: "Project Manager",
    department: "Operations",
    location: "Pretoria",
    salary: "R50,000/m",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    department: "Design",
    location: "Durban",
    salary: "R40,000/m",
  },
  {
    id: 5,
    title: "Network Administrator",
    department: "IT",
    location: "Bloemfontein",
    salary: "R38,000/m",
  },
  {
    id: 6,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Port Elizabeth",
    salary: "R32,000/m",
  },
  {
    id: 7,
    title: "Human Resources Officer",
    department: "HR",
    location: "Polokwane",
    salary: "R30,000/m",
  },
  {
    id: 8,
    title: "Financial Accountant",
    department: "Finance",
    location: "Nelspruit",
    salary: "R48,000/m",
  },
  {
    id: 9,
    title: "Human Resources Officer",
    department: "Human Resources",
    location: "Cape Town",
    salary: "R35,000/m",
  },
  {
    id: 10,
    title: "IT Support Technician",
    department: "IT",
    location: "Durban",
    salary: "R28,000/m",
  },
  {
    id: 11,
    title: "Marketing Coordinator",
    department: "Marketing",
    location: "Johannesburg",
    salary: "R32,500/m",
  },
  {
    id: 12,
    title: "Operations Manager",
    department: "Operations",
    location: "Port Elizabeth",
    salary: "R55,000/m",
  },
  {
    id: 13,
    title: "Systems Analyst",
    department: "IT",
    location: "Kimberley",
    salary: "R42,000/m",
  },
  {
    id: 14,
    title: "Legal Advisor",
    department: "Legal",
    location: "Cape Town",
    salary: "R50,000/m",
  },
  {
    id: 15,
    title: "Procurement Officer",
    department: "Supply Chain",
    location: "Mthatha",
    salary: "R36,000/m",
  },
  {
    id: 16,
    title: "Content Strategist",
    department: "Marketing",
    location: "East London",
    salary: "R34,000/m",
  },
  {
    id: 17,
    title: "Quality Assurance Specialist",
    department: "Operations",
    location: "George",
    salary: "R41,000/m",
  },
  {
    id: 18,
    title: "Recruitment Specialist",
    department: "HR",
    location: "Rustenburg",
    salary: "R33,500/m",
  },
  {
    id: 19,
    title: "Internal Auditor",
    department: "Finance",
    location: "Welkom",
    salary: "R47,000/m",
  },
  {
    id: 20,
    title: "Graphic Designer",
    department: "Design",
    location: "Mbombela",
    salary: "R31,000/m",
  },
  {
    id: 21,
    title: "Customer Service Manager",
    department: "Customer Service",
    location: "Gqeberha",
    salary: "R39,000/m",
  },
  {
    id: 22,
    title: "Risk Manager",
    department: "Compliance",
    location: "Bloemfontein",
    salary: "R52,000/m",
  },
  {
    id: 23,
    title: "Data Engineer",
    department: "Business Intelligence",
    location: "Johannesburg",
    salary: "R60,000/m",
  },
  {
    id: 24,
    title: "Public Relations Officer",
    department: "Communications",
    location: "Pretoria",
    salary: "R37,000/m",
  },
  {
    id: 25,
    title: "IT Security Specialist",
    department: "IT",
    location: "Polokwane",
    salary: "R53,000/m",
  }
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  function findJob() {
    const lowerSearch = searchTerm.toLowerCase();
    const results = jobs.filter((job) =>
      job.title.toLowerCase().includes(lowerSearch) ||
      job.department.toLowerCase().includes(lowerSearch) ||
      job.location.toLowerCase().includes(lowerSearch)
    );
    setFilteredJobs(results);
  }

  return (
    <div className="min-h-screen bg-white">
    <div className="fixed top-0 left-0 h-screen w-75 bg-black text-white p-5 hidden md:flex flex-col border-r border-black">
      <Sidebar />
    </div>

    <div className="md:ml-100 p-10 md:p-10">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
        Available Jobs
      </h1>

        <div className="flex justify-center mb-6 gap-2">
          <input
            type="search"
            placeholder="Location, title, or department"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && findJob()}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <img
            src={searchImg}
            alt="search"
            onClick={findJob}
            className="w-6 h-6 cursor-pointer"
          />
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
          <p className="text-center text-gray-500">No jobs found.</p>
        )}
      </div>
    </div>
  );
}

