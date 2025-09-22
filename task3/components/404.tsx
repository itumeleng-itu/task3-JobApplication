import React from "react"
import {Link} from "react-router-dom"

export default function FileNotFound(){
    return (
        <div style={{ 
            textAlign: 'center',
            padding: '50px',
            backgroundColor:"grey",
            position:"absolute",
            left:"40%",
            top:"30%",
            border:"2px solid black",
            borderRadius:"10px",
            color:"white"
            }}>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <Link to="/">Home</Link>
        </div>
      );
}