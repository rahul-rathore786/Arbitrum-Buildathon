import React, { useState } from "react";
import {
  FaMoneyBillWave,
  FaTag,
  FaUser,
  FaClock,
  FaBriefcase,
  FaHandshake,
  FaEye,
} from "react-icons/fa";
import { useGlobalState, setGlobalState } from "../store";
import { useNavigate } from "react-router-dom";
import { truncate } from "../store";

const JobListingCard = ({ jobListing }) => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const navigate = useNavigate();

  const openPlaceBidModal = () => {
    setGlobalState("jobListing", jobListing);
    setGlobalState("placeBidModal", "scale-100");
  };

  const manageAdminTasks = () => {
    navigate("/myprojects");
  };

  // State to track if full description is shown
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Toggle description visibility
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Limit description length
  const shortenDescription = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  // Check if description needs a "More" button
  const needsMoreButton = jobListing.description.length > 150;

  // Format date (placeholder for actual date data)
  const getPostedDate = () => {
    // This would ideally come from job data
    return "Recently";
  };

  // Get state label
  const getStateLabel = () => {
    switch (jobListing.state) {
      case 0:
        return { label: "Open", class: "bg-green-100 text-green-700" };
      case 1:
        return { label: "In Progress", class: "bg-blue-100 text-blue-700" };
      case 2:
        return { label: "Completed", class: "bg-purple-100 text-purple-700" };
      case 3:
        return { label: "Cancelled", class: "bg-red-100 text-red-700" };
      default:
        return { label: "Open", class: "bg-green-100 text-green-700" };
    }
  };

  const stateInfo = getStateLabel();

  return (
    <div className="card shadow-elevated mb-6 transition-all duration-300 hover:translate-y-[-4px] overflow-hidden border border-yellow-500 hover:border-blue-700 relative">
      {/* Status marker at top left corner */}
      <div
        className={`absolute top-0 left-0 w-2 h-full ${
          jobListing.state === 0
            ? "bg-gradient-to-b from-green-400 to-green-500"
            : "bg-gradient-to-b from-blue-400 to-blue-500"
        }`}
      ></div>

      <div className="p-6 pl-8">
        {/* Header with state badge and budget */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${stateInfo.class}`}
            >
              {stateInfo.label}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <FaClock className="text-[10px]" /> {getPostedDate()}
            </span>
          </div>
          <div className="flex items-center bg-gradient-to-r from-primary-100 to-secondary-100 px-3 py-1.5 rounded-full shadow-sm">
            <FaMoneyBillWave className="text-primary-600 mr-2" />
            <span className="text-secondary-700 font-semibold">
              ${jobListing.minBudget} - ${jobListing.maxBudget}
            </span>
          </div>
        </div>

        {/* Title with icon */}
        <div className="flex items-center gap-3 mb-3 mt-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-sm">
            <FaBriefcase />
          </div>
          <h3 className="font-display text-xl font-semibold text-gray-800">
            {jobListing.jobTitle}
          </h3>
        </div>

        {/* Description */}
        <div className="mb-5 pl-1 border-l-2 border-gray-100">
          <p className="text-gray-600">
            {showFullDescription ? jobListing.description : shortenDescription(jobListing.description)}
          </p>
          {needsMoreButton && (
            <button 
              onClick={toggleDescription}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-1 flex items-center transition-all duration-200 hover:underline"
            >
              {showFullDescription ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {jobListing.tags.length > 0
            ? jobListing.tags.map((tag, i) => (
                <span
                  key={i}
                  className="badge-primary flex items-center transition-all duration-300 hover:scale-105"
                >
                  <FaTag className="mr-1 text-[10px]" /> {tag}
                </span>
              ))
            : null}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4 mb-5 bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <FaHandshake className="text-primary-500" />
            <div>
              <p className="text-xs text-gray-500">Bidders</p>
              <p className="text-sm font-semibold">
                {jobListing.bidders.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaEye className="text-secondary-500" />
            <div>
              <p className="text-xs text-gray-500">Visibility</p>
              <p className="text-sm font-semibold">Public</p>
            </div>
          </div>
        </div>

        {/* Footer with client info and action button */}
        <div className="flex flex-wrap justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white mr-2 shadow-sm">
              <FaUser className="text-xs" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Posted by</p>
              <p className="text-sm font-semibold text-gray-700">
                {truncate(jobListing.owner, 4, 4, 11)}
              </p>
            </div>
          </div>

          {connectedAccount !== jobListing.owner &&
          !jobListing.bidders.includes(connectedAccount) ? (
            <button
              onClick={openPlaceBidModal}
              className="btn-gradient flex items-center gap-2 transform transition-transform duration-300 active:scale-95"
              aria-label="Place a bid on this job"
            >
              <FaHandshake className="text-xs" />
              Place Bid
            </button>
          ) : connectedAccount !== jobListing.owner &&
            jobListing.bidders.includes(connectedAccount) ? (
            <div className="badge-secondary flex items-center px-4 py-2">
              <FaClock className="mr-2 text-secondary-600" />
              <span>Request Pending</span>
            </div>
          ) : (
            <button
              onClick={manageAdminTasks}
              className="btn-secondary flex items-center gap-2 transform transition-transform duration-300 active:scale-95"
              aria-label="Manage this job"
            >
              <FaEye className="text-xs" />
              Manage
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListingCard;
