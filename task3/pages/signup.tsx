import React from 'react' ;
import { useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, Link } from "react-router-dom";
//import Button from "./button"

{/* Account details properties */}
type SignupFormData ={   
  username: string;
  email: string;
  password: string;
  password2: string;
}



export default function Signup() {
  const nav = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    username: "",
    email: "",
    password: "",
    password2:"",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Signup Data:", formData); {/*debugging checking to see if i have extracted signup info*/}
  };

  function verifyPassword(){
    if(formData.password2 !== formData.password){
      return false
    }
    const myData ={
      name:formData.username,
      password: formData.password
    }
    localStorage.setItem("signInData",JSON.stringify(myData))
    return true
  }

  function navToLogIn(){
    if(verifyPassword()){
      nav("/login")
    }
  }

  return ( 
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
          onSubmit={handleSubmit}
          style={{
            border:"1px solid #fff",
            borderRadius:"25px",
            margin:"6px",
            padding:"30px",
            boxShadow:"1px 1px 5px black",
            color:"black",
            textAlign:"start",
            width:"45%",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Sign Up
          </h2>

          <input 
          type="text" 
          name="username" 
          value={formData.username} 
          onChange={handleChange} 
          placeholder='username' 
          required 
          style={{
              width: "93%",
              padding: "10px",
              margin: "8px 0",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}/>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email"
            required
            style={{
              width: "93%",
              padding: "10px",
              margin: "8px 0",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="password"
            name="password"
            placeholder='enter password'
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: "93%",
              padding: "10px",
              margin: "8px 0",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="password"
            name="password2"
            placeholder='re-enter password'
            value={formData.password2}
            onChange={handleChange}
            required
            style={{
              width: "93%",
              padding: "10px",
              margin: "8px 0",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          />
          <button onClick={navToLogIn} style={{
            borderRadius: "10px",
            padding: "0.6em",
            fontSize: "1em",
            color:"white",
            width:"98%",
            fontWeight: 500,
            fontFamily: "inherit",
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(0, 0, 0, 1)',
            border:'1px solid rgba(255, 255, 255, 0.2)',
          }}>
        SignUp</button>
        <hr></hr>
        <p style={{
            textAlign:"center",
        }}> Already a member? <Link to="/login" style={{textDecoration:"none", color:"grey"}}>Login</Link>
        </p>
        </form>
      </div>
    </div>
  );
}
