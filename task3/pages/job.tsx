import React, { useState } from "react";
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
    <div className="job-card animate-fade-in">
      {/* Header */}
      <div className="job-card-header">
        <span className="job-id">{id}</span>
        <span className="job-location">
          {location}
        </span>
      </div>

      {/* Divider */}
      <hr className="border-gray-100 my-3" />

      {/* Content */}
      <h3 className="job-title">{title}</h3>
      <span className="job-department">{department}</span>

      {/* Footer */}
      <div className="job-footer">
        <span className="job-salary">{salary}</span>
        <button
          onClick={handleApply}
          disabled={isApplying || applied}
          className={`btn ${applied ? 'btn-secondary' : 'btn-primary'}`}
          style={{ 
            opacity: isApplying ? 0.7 : 1,
            cursor: applied ? 'default' : 'pointer'
          }}
        >
          {isApplying ? (
            <>
              Applying...
            </>
          ) : applied ? (
            <>Applied</>
          ) : (
            <>Apply Now</>
          )}
        </button>
      </div>
    </div>
  );
}
