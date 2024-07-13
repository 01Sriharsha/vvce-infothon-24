"use client"

import React, { useState } from "react";

// Dummy data
const dummyJobs = [
  {
    id: 1,
    title: "Software Engineer",
    description: "Build and maintain applications.",
    type: "Full-time",
    duration: "Permanent",
    package: "₹10,00,000 - ₹15,00,000 per annum",
    min_cgpa: "6.0",
  },
  {
    id: 2,
    title: "Data Scientist",
    description: "Analyze complex data to drive decisions.",
    type: "Full-time",
    duration: "Permanent",
    package: "₹12,00,000 - ₹18,00,000 per annum",
    min_cgpa: "6.5",
  },
  {
    id: 3,
    title: "Product Manager",
    description: "Lead product development from conception to launch.",
    type: "Contract",
    duration: "1 year",
    package: "₹15,00,000 - ₹22,00,000 per annum",
    min_cgpa: "7.0",
  },
  {
    id: 4,
    title: "UX Designer",
    description: "Create engaging user experiences for digital products.",
    type: "Full-time",
    duration: "Permanent",
    package: "₹8,00,000 - ₹12,00,000 per annum",
    min_cgpa: "6.0",
  },
];

const filterOptions = {
  type: ["Full-time", "Part-time", "Contract"],
  duration: ["Permanent", "1 year", "6 months"],
  min_cgpa: ["6.0", "6.5", "7.0", "7.5"],
};

const JobsPage = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [selectedMinCgpa, setSelectedMinCgpa] = useState("All");

  // Filter jobs based on selected filters
  const filteredJobs = dummyJobs.filter((job) => {
    return (
      (selectedType === "All" || job.type === selectedType) &&
      (selectedDuration === "All" || job.duration === selectedDuration) &&
      (selectedMinCgpa === "All" || job.min_cgpa === selectedMinCgpa)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-6 shadow-lg h-screen mt-4 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Filters</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Type</h3>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="All">All</option>
            {filterOptions.type.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Duration</h3>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
          >
            <option value="All">All</option>
            {filterOptions.duration.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Min CGPA</h3>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={selectedMinCgpa}
            onChange={(e) => setSelectedMinCgpa(e.target.value)}
          >
            <option value="All">All</option>
            {filterOptions.min_cgpa.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-8">
        <header className="text-center my-8 space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">Available Jobs</h1>
          <p className="text-lg text-gray-600">
            Explore a variety of job opportunities and find the perfect match
            for your skills and interests.
          </p>
        </header>

        <section className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.length === 0 ? (
            <p className="text-center text-lg text-gray-700">
              No jobs available with the selected filters.
            </p>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {job.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {job.description.slice(0, 100)}...
                  </p>
                  <div className="text-sm text-gray-500 mb-4">
                    <p>
                      <strong>Type:</strong> {job.type}
                    </p>
                    <p>
                      <strong>Duration:</strong> {job.duration}
                    </p>
                    <p>
                      <strong>Package:</strong> {job.package}
                    </p>
                    <p>
                      <strong>Min CGPA:</strong> {job.min_cgpa}
                    </p>
                  </div>
                  <a
                    href={`/jobs/${job.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default JobsPage;
