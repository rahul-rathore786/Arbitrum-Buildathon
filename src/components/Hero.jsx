import React from "react";
import {
  FaPlus,
  FaBriefcase,
  FaArrowRight,
  FaBrain,
  FaUserSecret,
} from "react-icons/fa";
import { useGlobalState, setGlobalState } from "../store";
import JobListingCard from "./JobListingCard";

const Hero = () => {
  const [jobs] = useGlobalState("jobs");
  const [connectedAccount] = useGlobalState("connectedAccount");

  const openModal = () => {
    setGlobalState("createModal", "scale-100");
  };

  return (
    <section>
      {/* Hero Header Section */}
      <div className="bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-700 text-white pt-8 pb-16 md:pb-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-10 right-10 w-56 h-56 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/3 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center md:text-left md:max-w-xl lg:max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 leading-tight">
              Secure Freelance Work with{" "}
              <span className="text-accent-300">Blockchain Payments</span>
            </h1>
            <p className="text-lg opacity-90 mb-8">
              Find, hire, and pay freelancers securely using SafeWorkPay's
              blockchain escrow system. No middlemen, just safe and secure
              transactions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {connectedAccount ? (
                <button
                  onClick={openModal}
                  className="btn-gradient shadow-xl flex items-center justify-center gap-2 py-3 px-6"
                >
                  <FaPlus /> Post a Job
                </button>
              ) : (
                <button className="btn-secondary shadow-xl flex items-center justify-center gap-2 py-3 px-6 opacity-80 cursor-not-allowed">
                  Connect Wallet to Post
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Job Listings */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 -mt-8 relative z-20">
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card bg-white p-4 flex items-center shadow-elevated">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-4">
              <FaBriefcase className="text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold">{jobs.length}</div>
              <div className="text-gray-500 text-sm">Active Projects</div>
            </div>
          </div>

          <div className="card bg-white p-4 flex items-center shadow-elevated">
            <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600 mr-4">
              <FaUserSecret className="text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold">100%</div>
              <div className="text-gray-500 text-sm">Blockchain Secured</div>
            </div>
          </div>

          <div className="card bg-white p-4 flex items-center shadow-elevated">
            <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center text-accent-600 mr-4">
              <FaBrain className="text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold">AI</div>
              <div className="text-gray-500 text-sm">Dispute Resolution</div>
            </div>
          </div>
        </div>

        {/* Listings Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display font-bold text-gray-800">
              {jobs.length > 0
                ? "Latest Job Listings"
                : "No Jobs Available Yet"}
            </h2>
          </div>

          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {jobs.map((job, i) => (
                <JobListingCard key={i} jobListing={job} />
              ))}
            </div>
          ) : (
            <div className="card p-8 text-center">
              <div className="text-gray-400 mb-4 text-5xl">
                <FaBriefcase />
              </div>
              <h3 className="text-xl font-medium mb-2">No job listings yet</h3>
              <p className="text-gray-500 mb-6">
                Be the first to post a job on our platform and connect with
                talented freelancers.
              </p>
              <button
                onClick={openModal}
                className="btn-primary inline-flex items-center gap-2"
              >
                <FaPlus /> Post a Job
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Button */}
      <button
        aria-label="Create new job"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 p-4 rounded-full text-white shadow-xl hover:shadow-2xl transition-all duration-300 z-40 flex items-center justify-center"
        onClick={openModal}
      >
        <FaPlus className="text-lg" />
      </button>
    </section>
  );
};

export default Hero;
