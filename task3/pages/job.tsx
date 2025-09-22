import React, { useState } from "react";

type JobProps = {
  id: number;
  title: string;
  department: string;
  location: string;
  salary: string;
};

type JobDetails = {
  name: string;
  date: Date;
  status: string;
};

// randomly pick a status
function getRandomStatus() {
  const options = ["approved", "pending", "rejected"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

export default function Job({
  id,
  title,
  department,
  location,
  salary,
}: JobProps) {
  const [applications, setApplications] = useState<JobDetails[]>(() => {
    const saved = localStorage.getItem("jobApplications");
    return saved ? JSON.parse(saved) : [];
  });

  const clickHandler = () => {
    const newApplication: JobDetails = {
      name: title,
      date: new Date(),
      status: getRandomStatus(), // calling the random value function
    };

    const updatedApplications = [...applications, newApplication];
    setApplications(updatedApplications);
    localStorage.setItem("jobApplications", JSON.stringify(updatedApplications));

    alert(
      `Applied for: ${title}.`
    );
  };

  return (
    <div
      style={{
        border: "1px solid #fff",
        borderRadius: "25px",
        margin: "6px",
        padding: "30px",
        boxShadow: "1px 1px 5px black",
        color: "black",
        textAlign: "start",
        width: "auto",
      }}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            border: "3px solid gray",
            justifySelf: "start",
            borderRadius: "35px",
            width: "55px",
          }}
        >
          <p style={{ textAlign: "center", fontWeight: "800" }}>{id}</p>
        </div>
        <div style={{ marginLeft: "auto", marginTop: "20px" }}>
          <strong>{location}</strong>
        </div>
      </div>

      <hr />

      <p>
        <strong>{title}</strong>
      </p>
      <strong
        style={{
          border: "1px solid gray",
          borderRadius: "4px",
          backgroundColor: "gray",
          display: "inline-block",
          padding: "0 4px",
        }}
      >
        {department}
      </strong>

      <hr />

      <div style={{ display: "flex" }}>
        <strong style={{ marginTop: "10px" }}>{salary}</strong>
        <button
          onClick={clickHandler}
          style={{
            borderRadius: "8px",
            padding: "0.4em 1.2em",
            fontSize: "1em",
            fontWeight: 500,
            fontFamily: "inherit",
            marginLeft: "auto",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(0, 0, 0, 1)",
            color: "white",
            border: "1px solid rgba(0, 0, 0, 0.4)",
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
