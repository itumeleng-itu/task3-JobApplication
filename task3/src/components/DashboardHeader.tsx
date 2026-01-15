interface DashboardHeaderProps {
  username: string;
}

export default function DashboardHeader({ username }: DashboardHeaderProps) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-ZA', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  const timeStr = now.toLocaleTimeString('en-ZA', { 
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
