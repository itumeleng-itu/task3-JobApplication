import { useState } from "react";
import { applicationsApi } from "../src/services/api";

type JobProps = {
  id: number;
  title: string;
  department: string;
  location: string;
  salary: string;
};

export default function Job({
  id,
  title,
  department,
  location,
  salary,
}: JobProps) {
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleApply = async () => {
    setIsApplying(true);
    
    try {
      // Create application via API
      const application = await applicationsApi.create({
        jobId: id,
        jobTitle: title,
        date: new Date().toISOString(),
        status: 'pending'
      });

      if (application) {
        setApplied(true);
        // Show success message
        setTimeout(() => {
          alert(`Successfully applied for: ${title}!\n\nYour application is now pending review.`);
        }, 100);
      }
    } catch (error) {
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 transition-all hover:border-blue-500 hover:shadow-lg animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{id}</span>
        <span className="text-sm text-gray-500 font-medium">
          {location}
        </span>
      </div>

      {/* Divider */}
      <hr className="border-gray-100" />

      {/* Content */}
      <h3 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h3>
      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg w-fit">{department}</span>

      {/* Footer */}
      <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-gray-100">
        <span className="text-lg font-black text-gray-900">{salary}</span>
        <button
          onClick={handleApply}
          disabled={isApplying || applied}
          className={`w-fit px-4 py-2 text-xs font-bold rounded-lg transition-opacity ${
            applied 
              ? 'bg-gray-100 text-gray-500 cursor-default' 
              : 'bg-gray-900 text-white hover:opacity-90'
          }`}
          style={{ opacity: isApplying ? 0.7 : 1 }}
        >
          {isApplying ? 'Applying...' : applied ? 'Applied' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
}
