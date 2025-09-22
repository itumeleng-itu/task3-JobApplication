import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../src/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../src/components/ui/alert-dialog"


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
                <Button variant="secondary" className="px-4 py-2 bg-white text-black rounded w-44"
                    onClick={() => navigate("/profile")}
                >DASHBOARD</Button>
                <Button variant="secondary" className="px-4 py-2 bg-white text-black rounded w-44"
                    onClick={() => navigate("/addDetails")}
                >UPLOAD DETAILS</Button>
                <Button variant="secondary" className="px-4 py-2 bg-white text-black rounded w-44"
                    onClick={() => navigate("/myJobs")}
                >MY JOBS</Button>
                <Button variant="secondary" className="px-4 py-2 bg-white text-black rounded w-44"
                    onClick={() => navigate("/jobs")}
                >ALL JOBS</Button>
                <Button variant="secondary" className="px-4 py-2 bg-white text-black rounded w-44"
                    onClick={() => navigate("/history")}
                >APPLICATION HISTORY</Button>
                
                
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="px-4 py-2 text-white rounded w-44"
                        >Logout</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                        <AlertDialogDescription>
                            You will be logged out
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction  
                        onClick={()=>navigate("/login")}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
