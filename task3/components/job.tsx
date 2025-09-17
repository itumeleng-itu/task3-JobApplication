import React from "react"
import { useState } from "react";

type JobProps = {  //properties of a job
  id: number;
  title: string;
  department: string;
  location: string;
  salary: string;
};

type JobDetails = {  //details of a job
  name: string;
  date: Date;
  approved: boolean;
};

const isApproved = () => Math.random() >= 0.5;  //randomly approving or rejecting applications

export default function Job({ id, title, department, location, salary }: JobProps) {  //passing props into a function
  const [job, setJob] = useState<JobDetails>({
    name: "",
    date: new Date(),
    approved: isApproved(),
  });
const myJobs=[];
  const clickHandler = () => {  //what happens after i click the apply button
    setJob({ name: title, date: new Date(), approved: isApproved() });
    alert(`Applied for: ${title}`);
    console.log(job);
    myJobs.push(job);

    
  };

  return (
    <div style={{
        border:"1px solid #fff",
        borderRadius:"15px",
        margin:"6px",
        padding:"30px",
        boxShadow:"1px 1px 5px black",
        color:"black",
        textAlign:"start",
        width:"250px",
        
    }}>

        <div style={{
            display:"flex",
        }}>
            <div style={{
                border:"3px solid black",
                justifySelf:"start",
                borderRadius:"35px",
                width:"55px",
                height:"auto",
                alignContent:"center",
                justifyContent:"center",

            }}><p style={{
                textAlign:"center",
                fontWeight:"800"
            }}>{id}</p></div>
            <div style={{
                marginLeft:"auto",
                marginTop:"20px"
            }}><strong>{location}</strong>
                </div>
        </div>
        <hr></hr>
      <p>
        <p>Job Title: <strong>{title}</strong></p>
        <p>Department: <strong>{department}</strong></p> 

      </p>
      <hr></hr>
      <div  style={{
        display:"flex"
      }}>
      <strong style={{
        marginTop:"10px"
      }}>{salary}</strong>
      <button onClick={clickHandler} style={{
            borderRadius: "8px",
            padding: "0.4em 1.2em",
            fontSize: "1em",
            fontWeight: 500,
            fontFamily: "inherit",
            marginLeft:"auto",
            width:"auto",
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(0, 0, 0, 1)',
            border:'1px solid rgba(0, 0, 0, 0.4)',
      }}>
        Apply</button>
        </div>
    </div>
  );
}
