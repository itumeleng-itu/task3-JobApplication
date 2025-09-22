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
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
          height: "100vh",
        }}
      >
        <div style={{
            backgroundColor: "black",
            color: "white",
            padding: "1rem",
            position: "relative",
            top: 0,
            height: "100%",
            textAlign:"center",
            border:"1px solid black",
            width: "100%",
            boxSizing: "border-box"
          }}>
            <Sidebar />
        </div>

        <div
          style={{
            padding: "2rem",
            marginLeft:"0",
          }}
        >
          <h1 style={{
            textAlign:"center",
            color:"black",
            fontWeight:"800"
          }}>Available Jobs</h1>
          <div style={{
                marginLeft:"45%",
                marginBottom:"2%",
                color:"black"
            }}>
            <input 
              type="search" 
              placeholder="location, title, or department" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && findJob()}
              style={{
                color:"black",
                padding:"0.5em",
                backgroundColor:"white",
                border:"1px solid black",
                borderRadius:"10px",
              }}
            />
            <img 
              src={searchImg} 
              alt="search" 
              onClick={findJob} 
              style={{
                padding:"2px",
                margin:"2px",
                width:"24px",
                position:"relative",
                top:"10px",
                cursor: "pointer"
              }}
            />
          </div>
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
              <p style={{
                textAlign: "center" }}>
                No jobs found.
              </p>
            )}
          </div>
        </div>
        
      </div>
    </>
  );
}
