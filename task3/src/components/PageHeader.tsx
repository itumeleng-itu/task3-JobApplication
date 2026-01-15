import { useState, useEffect } from 'react';

export default function PageHeader() {
  const [username, setUsername] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Get username from localStorage
    const signInData = localStorage.getItem("signInData");
    if (signInData) {
      const parsed = JSON.parse(signInData);
      setUsername(parsed.name || parsed.username || "User");
    }

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const dateStr = currentTime.toLocaleDateString('en-ZA', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  
  const timeStr = currentTime.toLocaleTimeString('en-ZA', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  }).replace(':', 'h');

  return (
    <div className="flex justify-between items-start mb-8 bg-black text-white p-6 -mx-6 -mt-6 md:-mx-12 md:-mt-12 md:p-12 md:pb-8">
      <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {username}</h1>
      <div className="text-right">
        <p className="text-lg font-semibold">{dateStr}</p>
        <p className="text-lg font-semibold">{timeStr}</p>
      </div>
    </div>
  );
}
