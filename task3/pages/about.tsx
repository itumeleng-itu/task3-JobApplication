import Sidebar from "./sidebar";

export default function About() {
  const infoCards = [
    {
      title: "What is a Job Application Tracker?",
      content: "A job application tracker helps you organize and monitor your job search process. Track applications, follow up on leads, and stay organized throughout your career journey.",
    },
    {
      title: "Why Use This App?",
      content: "Stay organized, never miss a follow-up, and gain insights into your job search progress. Our tracker helps you manage multiple applications efficiently.",
    },
    {
      title: "Key Features",
      items: [
        "Track application status (Pending, Approved, Rejected)",
        "Search and filter available jobs",
        "Personalized job recommendations",
        "Application history with statistics"
      ],
    },
    {
      title: "Getting Started",
      items: [
        "Complete your profile with job preferences",
        "Browse available positions",
        "Apply with one click",
        "Track your progress in real-time"
      ],
    }
  ];

  return (
    <div className="flex min-h-screen w-full bg-white">
      <Sidebar />
      
      <main className="flex-1 p-6 md:p-12 md:ml-[280px] bg-white transition-all duration-300">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">About This App</h1>
          <p className="text-gray-500 font-medium">Learn more about how to use the Job Application Tracker</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {infoCards.map((card, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm animate-fade-in hover:shadow-md transition-shadow" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center gap-3 mb-5">
                <h3 className="font-extrabold text-gray-900 text-xl tracking-tight">{card.title}</h3>
              </div>
              {card.content && (
                <p className="text-gray-500 leading-relaxed">{card.content}</p>
              )}
              {card.items && (
                <ul className="space-y-3 mt-4">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 font-medium">
                      <span className="text-blue-500 font-black">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
