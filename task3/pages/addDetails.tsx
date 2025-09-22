import React from "react" 
import { useState } from "react";
import Sidebar from "./sidebar";
import {useNavigate} from "react-router-dom";

export default function UserDetails() {

    const nav = useNavigate();
  const [userData, setUserData] = useState({
    fullnames: "",
    email: "",
    gender: "",
    address: "",
    department: "",
  });

  function toMyJobs(){
    nav("/myJobs")
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function saveDetails(e) {
    e.preventDefault();
    const myData ={
        address:userData.address,
        department:userData.department
      }
    localStorage.setItem("cv",JSON.stringify(myData))
    console.log("user");
    
    return true
  }

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr",
          height: "100vh",
        }}
      >
        <div
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "1rem",
            textAlign: "center",
            border: "1px solid black",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Sidebar />
        </div>
        <div>
          <form
            onSubmit={saveDetails}
            style={{
              border: "1px solid #fff",
              borderRadius: "25px",
              marginLeft: "30%",
              marginTop: "15%",
              padding: "30px",
              boxShadow: "1px 1px 5px black",
              color: "black",
              textAlign: "start",
              width: "30%",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Relevant Job Information
            </h2>

            <input
              type="text"
              name="fullnames"
              value={userData.fullnames}
              onChange={handleChange}
              placeholder="Full Names"
              required
              style={inputStyle}
            />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              style={inputStyle}
            />

            <div style={{ margin: "8px 0" }}>
              <label className="ml-4 p-2">Male</label>
              <input
                type="radio"
                name="gender"
                value="male"
                required
                checked={userData.gender === "male"}
                onChange={handleChange}
              />
              <label className="ml-4 p-2">Female</label>
              <input
                type="radio"
                name="gender"
                value="female"
                required
                checked={userData.gender === "female"}
                onChange={handleChange}
              />
            </div>

            <textarea
              name="address"
              value={userData.address}
              onChange={handleChange}
              placeholder="Enter address(include city name)"
              required
              style={inputStyle}
            ></textarea>

            <input
              type="text"
              name="department"
              value={userData.department}
              onChange={handleChange}
              placeholder="Enter department (IT, FINANCE, etc.)"
              required
              style={inputStyle}
            />

            <hr />
            <button type="submit" onClick={toMyJobs} style={buttonStyle}>
              Add Details
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  borderRadius: "10px",
  border: "1px solid #ccc",
  backgroundColor:"black",
  color:"white"
};

const buttonStyle = {
  borderRadius: "10px",
  padding: "0.6em",
  fontSize: "1em",
  color: "white",
  width: "40%",
  fontWeight: 500,
  fontFamily: "inherit",
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(0, 0, 0, 1)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  marginLeft: "30%",
};
