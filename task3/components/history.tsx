import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';

type JobDetails = {
    name: string;
    date: Date;
    approved: boolean;
};

export default function History() {
    const [applications, setApplications] = useState<JobDetails[]>([]);

    useEffect(() => {
        const savedApps = localStorage.getItem('jobApplications');
        if (savedApps) {
            // Parse the saved applications and convert date strings back to Date objects
            const apps = JSON.parse(savedApps).map((app: JobDetails) => ({
                ...app,
                date: new Date(app.date)
            }));
            setApplications(apps);
        }
    }, []);

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 4fr",
                gap: "10px",
                height: "100vh",
            }}
        >
            <div style={{
                backgroundColor: "black",
                color: "white",
                padding: "1rem",
                position: "sticky",
                top: 0,
                height: "100vh",
                textAlign: "center",
                border: "1px solid black",
                width: "100%",
                boxSizing: "border-box"
            }}>
                <Sidebar />
            </div>
            
            <div style={{
                padding: "2rem",
                overflow: "auto"
            }}>
                <h1 style={{
                    textAlign: "center",
                    color: "black",
                    fontWeight: "800",
                    marginBottom: "2rem"
                }}>Application History</h1>
                
                <div style={{
                    display: "grid",
                    gap: "1rem"
                }}>
                    {applications.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#fafafaff" }}>No applications yet</p>
                    ) : (
                        applications.map((app, index) => (
                            <div key={index} style={{
                                border: "1px solid #fff",
                                borderRadius: "15px",
                                padding: "1.5rem",
                                boxShadow: "1px 1px 5px black",
                                backgroundColor: app.approved ? "rgba(255, 255, 255, 1)" : "rgba(240, 240, 240, 1)"
                            }}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "0.5rem"
                                }}>
                                    <h3 style={{ margin: 0 }}>{app.name}</h3>
                                    <span style={{
                                        padding: "0.3rem 0.8rem",
                                        borderRadius: "15px",
                                        backgroundColor: app.approved ? "rgba(255, 255, 255, 1)" : "rgba(240, 240, 240, 1)",
                                        color: "black",
                                        fontSize: "0.9rem"
                                    }}>
                                        {app.approved ? "Approved" : "Pending Review"}
                                    </span>
                                </div>
                                <p style={{ 
                                    color: "#000000ff",
                                    margin: "0.5rem 0 0 0",
                                    fontSize: "0.9rem"
                                }}>
                                    Applied on: {new Date(app.date).toLocaleDateString()}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
