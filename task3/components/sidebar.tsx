import React from "react"
import Button from "./button"

export default function Sidebar(){

    const clicked =() =>{
        alert("clicked")
    }
    return (
        <div
          
        >
          <h2>Sidebar</h2>
          <div style={{
            display:"grid",
            gridTemplateColumns:"1fr",
            justifyContent:"center",
            marginTop:"30%",
            gap:"1em"
          }}>
            <Button name="stunna" onClick={clicked} />
            <Button name="stunna" onClick={clicked}/>
            <Button name="stunna" onClick={clicked}/>
            <Button name="stunna" onClick={clicked}/>
          </div>
        </div>
    )
}