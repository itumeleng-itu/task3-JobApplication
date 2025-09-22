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
} from "../src/components/ui/alert-dialog";

export default function Sidebar() {
  const navigate = useNavigate();
  const data = localStorage.getItem("signInData");
  if (!data) return null;
  const myData = JSON.parse(data);
  const date = new Date();

  const menuItems = [
    { label: "DASHBOARD", route: "/profile" },
    { label: "UPLOAD DETAILS", route: "/addDetails" },
    //{ label: "MY JOBS", route: "/myJobs" },
    { label: "ALL JOBS", route: "/jobs" },
    { label: "APPLICATION HISTORY", route: "/history" },
  ];

  return (
    <div className="flex flex-col h-screen w-66 bg-black p-5 text-white shadow-lg ">
      <div className="mb-9">
        <h3 className="text-lg font-bold">Hi, {myData.name}</h3>
        <p className="text-sm text-white">{date.toLocaleString()}</p>
      </div>

      <nav className="flex flex-col gap-3 flex-grow">
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant="secondary"
            className="w-full py-5 text-black bg-white transition-colors rounded-md"
            onClick={() => navigate(item.route)}
          >
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="mt-auto">
        <AlertDialog>
          <AlertDialogTrigger >
            <Button
              variant="destructive"
              className="w-full py-2 mt-4 px-18 mb-3 bg-red-600 hover:bg-red-700 rounded-md text-white"
            >
              Logout
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className=" rounded-lg bg-black p-7">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg font-semibold text-white">
                Confirm Logout
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                Are you sure you want to continue? <br></br>You will be logged out.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-end gap-2">
              <AlertDialogCancel className="px-4 py-2 bg-gray-200 rounded-md">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="px-7 py-2 bg-red-600 rounded-md text-white"
                onClick={() => navigate("/login")}
              >
                Yes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
