import React, { useEffect, useState } from "react";

export default function AutoAlert({ message, duration = 3000 }: { message: string; duration?: number }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed top-10 right-230 bg-black text-white px-4 py-2 rounded shadow-lg animate-slide-in">
      {message}
    </div>
  );
}
