import React, { useEffect, useState } from "react";
import { Header, JobListingCard } from "../components";
import { useGlobalState } from "../store";
import { FaSearch, FaFilter } from "react-icons/fa";

const BrowseJobs = () => {
  const [jobs] = useGlobalState("jobs");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "web", label: "Web Development" },
    { value: "mobile", label: "Mobile Development" },
    { value: "design", label: "Design" },
    { value: "writing", label: "Content Writing" },
    { value: "marketing", label: "Digital Marketing" },
    { value: "other", label: "Other" },
  ];

  useEffect(() => {
    let results = [...jobs];
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        job =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (categoryFilter !== "all") {
      results = results.filter(job => 
        job.category && job.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    setFilteredJobs(results);
  }, [jobs, searchTerm, categoryFilter]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Browse Job Listings</h1>
        
        {/* Search and Filter */}
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, i) => (
              <JobListingCard job={job} key={i} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                {jobs.length > 0
                  ? "No jobs match your search criteria"
                  : "No jobs available at the moment"}
              </p>
              <p className="mt-2 text-primary-600">
                Check back later or adjust your filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseJobs;
