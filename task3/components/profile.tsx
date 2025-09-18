import React from 'react';
import uiImg from "../media/ui.jpg";
import Sidebar from "./sidebar"

export default function Dashboard() {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 4fr",
            gap: "10px",
            height: "100vh",
          }}>
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
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            height: "100vh",
            padding: "20px",
            backgroundColor: "#f5f5f2",
        }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{
                    border: "1px solid #d2d2d7",
                    borderRadius: "14px",
                    padding: "20px",
                    backgroundColor: "white",
                    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                }}>
                    <h3 style={{ fontWeight: 600, color: "#1d1d1f" }}>What is a web app:</h3>
                    <p style={{ color: "black", lineHeight: 1.5 }}>
                        A web application is a software program that runs on a remote server
                        and is accessed through a web browser over the internet. Unlike traditional
                        desktop applications, web apps do not require installation on a device and
                        can be used directly from a browser like Chrome, Safari, or Firefox.
                    </p>
                </div>
                <div style={{
                    border: "1px solid #d2d2d7",
                    borderRadius: "14px",
                    padding: "20px",
                    backgroundColor: "white",
                    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                }}>
                    <h3 style={{ fontWeight: 600, color: "#1d1d1f" }}>Purpose for a web app</h3>
                    <p style={{ color: "black", lineHeight: 1.5 }}>
                        The primary purpose of a web application is to allow users to perform tasks and
                        access services through a web browser.
                        <ul style={{ paddingLeft: "20px", color: "black" }}>
                            <li>Provides Functionality (allows user interaction)</li>
                            <li>Delivers Remote Services (delivers its features over the internet through a web browser)</li>
                            <li>Enables Interaction and Data Exchange (send and receive data between their browser and the server, engaging in actions like logging in)</li>
                        </ul>
                    </p>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{
                    border: "1px solid #d2d2d7",
                    borderRadius: "14px",
                    padding: "20px",
                    backgroundColor: "white",
                    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                }}>
                    <h3 style={{ fontWeight: 600, color: "black" }}>Benefits</h3>
                    <p style={{ color: "black"}}>
                        <ul style={{ 
                            paddingLeft: "20px", 
                            color: "black" }}>
                            <li>Accessibility - Users can access web apps from any device (desktop, mobile, tablet) that has a web browser, as long as there is an internet connection.</li>
                            <li>Cross-Platform Compatibility - A single web app can work across different operating systems and devices, saving development time and costs compared to creating separate native applications for each platform.</li>
                            <li>Easy Updates - Updates and new features can be deployed to all users simultaneously from the server.</li>
                        </ul>
                    </p>
                </div>
                <div style={{
                    border: "1px solid #d2d2d7",
                    borderRadius: "14px",
                    padding: "20px",
                    backgroundColor: "white",
                    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                }}>
                    <h3 style={{ fontWeight: 600, color: "#1d1d1f" }}>Examples of a web app</h3>
                    <ul style={{ paddingLeft: "20px", color: "black" }}>
                        <li>Google Docs</li>
                        <li>Trello</li>
                        <li>Gmail</li>
                    </ul>
                </div>
            </div>
            <div style={{
                border: "1px solid #d2d2d7",
                borderRadius: "14px",
                padding: "20px",
                backgroundColor: "white",
                boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                height: "90%", 
                display: "flex",
                flexDirection: "column",
            }}>
                <div>
                    <h3 style={{ fontWeight: 600, color: "#1d1d1f" }}>Examples of a web app</h3>
                    <img
                        src={uiImg}
                        alt="a web app"
                        style={{
                            width: "100%",
                            borderRadius: "8px",
                            marginTop: "10px",
                        }}
                    />
                </div>
            </div>
        </div>
        </div>
    );
}
