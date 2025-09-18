import React from "react";
import Job from "./Job";
import Sidebar from "./sidebar"

const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    department: "IT",
    location: "Johannesburg",
    salary: "R45,000/month",
  },
  {
    id: 2,
    title: "Data Analyst",
    department: "Business Intelligence",
    location: "Cape Town",
    salary: "R35,000/month",
  },
  {
    id: 3,
    title: "Project Manager",
    department: "Operations",
    location: "Pretoria",
    salary: "R50,000/month",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    department: "Design",
    location: "Durban",
    salary: "R40,000/month",
  },
  {
    id: 5,
    title: "Network Administrator",
    department: "IT",
    location: "Bloemfontein",
    salary: "R38,000/month",
  },
  {
    id: 6,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Port Elizabeth",
    salary: "R32,000/month",
  },
  {
    id: 7,
    title: "Human Resources Officer",
    department: "HR",
    location: "Polokwane",
    salary: "R30,000/month",
  },
  {
    id: 8,
    title: "Financial Accountant",
    department: "Finance",
    location: "Nelspruit",
    salary: "R48,000/month",
  },
  {
  id: 9,
  title: "Human Resources Officer",
  department: "Human Resources",
  location: "Cape Town",
  salary: "R35,000/month",
},
{
  id: 10,
  title: "IT Support Technician",
  department: "IT",
  location: "Durban",
  salary: "R28,000/month",
},
{
  id: 11,
  title: "Marketing Coordinator",
  department: "Marketing",
  location: "Johannesburg",
  salary: "R32,500/month",
},
{
  id: 12,
  title: "Operations Manager",
  department: "Operations",
  location: "Port Elizabeth",
  salary: "R55,000/month",
}

];

export default function App() {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr",
          gap: "10px",
          height: "100vh",
        }}
      >
        <div style={{
            backgroundColor: "black",
            color: "white",
            padding: "1rem",
            position: "sticky",
            top: 0,
            height: "100vh",
            textAlign:"center",
            border:"1px solid black",
            width: "100%",
            boxSizing: "border-box"
          }}>
            <Sidebar />
        </div>

        <div
          style={{
            //backgroundColor: "red",
            padding: "2rem",
            marginLeft:"10%",
            width:"80%"
          }}
        >
          <h1 style={{
            textAlign:"center",
            color:"black",
            fontWeight:"800"
          }}>Available Jobs</h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
            }}
          >
            {jobs.map((job) => (
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
        </div>
        
      </div>
    </>
  );
}
