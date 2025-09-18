import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./button";

export default function Sidebar() {
    const navigate = useNavigate();

    const data = localStorage.getItem("signInData");

    if(!data) return ;
    const myData = JSON.parse(data);
    const date = new Date(); 
    return (
        <div>
          <h3><i>Hi, {myData.name}, current date & time : {date.toLocaleString()}</i></h3>
          <div style={{
            display:"grid",
            gridTemplateColumns:"1fr",
            justifyContent:"center",
            marginTop:"30%",
            gap:"1em"
          }}>
            <Button name="JOBS" onClick={() => navigate("/jobs")} />
            <Button name="APPLICATION HISTORY" onClick={() => navigate("/history")} />
            <Button name="PROFILE" onClick={() => navigate("/profile")} />
            <Button name="SETTINGS" onClick={() => navigate("/settings")} />
          </div>
        </div>
    )
}