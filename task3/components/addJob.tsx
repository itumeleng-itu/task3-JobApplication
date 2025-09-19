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
