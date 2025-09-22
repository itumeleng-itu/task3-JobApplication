import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import AutoAlert from "../src/components/ui/auto-dismiss"
import { Progress } from "@/components/ui/progress"



 export default function Login(){

  const nav = useNavigate();
  const [userData, setuserData] = useState ({
      name:"",
      password:""
  })

    
    const myData = localStorage.getItem("signInData")
    if(!myData) return null;
    const savedUserData = JSON.parse(myData)

    function showSum(e: React.FormEvent){
      e.preventDefault()
        console.log(savedUserData.name); {/*Debugging */}
        console.log(userData.name); {/*Debugging */}
        console.log("************************************");
        console.log("************************************");
        console.log(savedUserData.password); {/*Debugging */}
        console.log(userData.password);
        
        

      if(savedUserData.name !== userData.name){
      alert("invalid username")
      }
      else if(savedUserData.password !== userData.password){
      alert("invalid username")
      }
      else{
      nav("/profile");
      <AutoAlert message= "You have logged in " duration={3000} />
      }
    }
    
    return(
        <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width:"205vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",

        }}
      >
        <form
          onSubmit={showSum}
          style={{
            border:"1px solid #fff",
            borderRadius:"25px",
            margin:"6px",
            padding:"30px",
            boxShadow:"1px 1px 5px black",
            color:"black",
            textAlign:"start",
            width:"40%",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Log In
          </h2>

          <input 
          type="text" 
          name="username" 
          onChange={(e)=> {
            setuserData(prevState => ({
              ...prevState,
              name: e.target.value
            }))
          }} 
          placeholder='username' 
          required 
          style={{
              width: "90%",
              padding: "10px",
              margin: "8px 0",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}/>

          <input
            type="password"
            name="password"
            placeholder='enter password'
            onChange={(e)=> {
            setuserData(prevState => ({
              ...prevState,
              password: e.target.value
            }))
          }} 
            required
            style={{
              width: "90%",
              padding: "10px",
              margin: "8px 0",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          />
          <button style={{
            borderRadius: "10px",
            padding: "0.6em",
            fontSize: "1em",
            color:"white",
            width:"100%",
            fontWeight: 500,
            fontFamily: "inherit",
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(0, 0, 0, 1)',
            border:'1px solid rgba(255, 255, 255, 0.2)',
            
          }}>
        LogIn</button>
        <hr></hr>
        <p style={{
            textAlign:"center"
        }}> Not a member? <Link to="/signup" style={{textDecoration:"none", color:"grey"}}>SignUp</Link>
        </p>
        </form>
      </div>
    </div>
    )
 }

