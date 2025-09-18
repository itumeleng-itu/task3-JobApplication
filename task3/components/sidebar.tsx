import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./button";


export default function Sidebar() {
    const navigate = useNavigate();
    const data = localStorage.getItem("signInData");
    if (!data) return null;
    const myData = JSON.parse(data);
    const date = new Date();

    return (
        <div style={{
            height: "100vh",
            padding: "1em",
            backgroundColor: "black",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
        }}>
            <h3 style={{
                fontWeight: 700,
                color: "white",
                margin: "0 0 1em 0",
            }}>
                Hi, {myData.name}, current date & time: {date.toLocaleString()}
            </h3>

            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
                gap: "1em",
                marginTop: "auto",
                marginBottom: "auto",
                width: "100%",
            }}>
                <Button
                    name="DASHBOARD"
                    onClick={() => navigate("/profile")}
                />
                <Button
                    name="JOBS"
                    onClick={() => navigate("/jobs")}
                />
                <Button
                    name="APPLICATION HISTORY"
                    onClick={() => navigate("/history")}
                />
                <Button
                    name="SETTINGS"
                    onClick={() => navigate("/settings")}
                />
                <Button
                    name="LOGOUT"
                    onClick={() => navigate("/login")}
                />
            </div>
        </div>
    );
}
