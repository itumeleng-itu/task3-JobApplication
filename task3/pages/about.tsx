import Sidebar from "./sidebar";
import PageHeader from "../src/components/PageHeader";

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
      
      <main className="flex-1 p-6 md:p-12 md:ml-[200px] bg-white transition-all duration-300">
        <PageHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {infoCards.map((card, index) => (
            <div key={index} className="bg-gray-200 rounded-2xl p-8">
              <h3 className="font-bold text-black text-xl mb-4">{card.title}</h3>
              {card.content && (
                <p className="text-gray-600 leading-relaxed">{card.content}</p>
              )}
              {card.items && (
                <ul className="space-y-3">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <span className="text-black font-black">•</span>
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
