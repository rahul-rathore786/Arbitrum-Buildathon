import React from "react";
import {
  FaMoneyBill,
  FaBriefcase,
  FaUser,
  FaTag,
  FaComments,
  FaCheckCircle,
  FaExclamationTriangle,
  FaGithub,
  FaClipboardCheck,
} from "react-icons/fa";
import { setGlobalState, truncate } from "../store";
import { Link } from "react-router-dom";

const JobListingFreelancerActions = ({ jobListing }) => {
  const openCompleteModal = () => {
    setGlobalState("completeModal", "scale-100");
    setGlobalState("jobListing", jobListing);
  };

  const openDisputeModal = () => {
    setGlobalState("raiseDisputeModal", "scale-100");
    setGlobalState("job", jobListing);
  };

  return (
    <div className="card mb-6 overflow-visible hover:translate-y-[-2px] transition-all duration-300">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 px-6 py-4 border-b border-gray-100 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/80 rounded-lg shadow-sm text-primary-600">
            <FaBriefcase className="text-lg" />
          </div>
          <h4 className="font-display text-lg font-semibold text-gray-800">
            {jobListing.jobTitle}
          </h4>
        </div>
      </div>

      <div className="p-4">
        {/* Final Budget section */}
        <div className="flex items-center gap-2 mb-3 bg-gray-50/80 p-2 rounded-lg">
          <div className="p-2 bg-secondary-100 rounded-full text-secondary-600">
            <FaMoneyBill className="text-md" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Final Budget</p>
            <span className="font-medium text-gray-700">
              ${jobListing.finalBudget}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center mt-4 text-sm flex-wrap gap-2">
          {jobListing.tags.length > 0
            ? jobListing.tags.map((tag, i) => (
                <span
                  key={i}
                  className="badge-secondary inline-flex items-center"
                >
                  <FaTag className="mr-1 text-xs" />
                  {tag}
                </span>
              ))
            : null}
        </div>

        {/* Description section */}
        <div className="mb-3 mt-3">
          <p className="text-gray-700 leading-relaxed border-l-4 border-primary-100 pl-3 py-1 italic">
            {jobListing.description}
          </p>
        </div>

        {/* Client info */}
        <div className="flex items-center gap-3 mb-3 bg-primary-50/50 p-2 rounded-lg">
          <div className="p-2 bg-primary-100 rounded-full text-primary-600">
            <FaUser className="text-md" />
          </div>
          <div>
            <p className="text-md text-gray-500">Client</p>
            <p className="font-medium text-primary-700">
              {truncate(jobListing.owner, 4, 4, 11)}
            </p>
          </div>
        </div>
        {/* GitHub URL for submitted work */}
        {jobListing.githubUrl && (
          <div className="flex items-center gap-2 mb-3 bg-gray-50/80 p-2 rounded-lg">
            <div className="p-2 bg-gray-800 rounded-full text-white">
              <FaGithub className="text-md" />
            </div>
            <div className="flex-grow overflow-hidden">
              <p className="text-md text-gray-500">Submitted Work</p>
              <a
                href={jobListing.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:text-blue-800 hover:underline text-md truncate block"
              >
                {jobListing.githubUrl}
              </a>
            </div>
          </div>
        )}

        {/* Status-based action buttons */}
        <div className="border-t border-gray-100 pt-3 mt-2">
          {jobListing.state === 1 && ( // InProgress
            <div className="flex flex-wrap gap-3">
              <button
                onClick={openCompleteModal}
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg shadow-md hover:shadow-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300"
                aria-label="Mark job as complete"
              >
                <FaClipboardCheck className="text-sm" />
                <span className="font-medium">Complete Job</span>
              </button>
              <Link
                to={`/chats/${jobListing.owner}`}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-primary-300 text-primary-600 rounded-lg shadow-sm hover:shadow-md hover:bg-primary-50 transition-all duration-300"
                aria-label="Chat with client"
              >
                <FaComments className="text-sm" />
                <span className="font-medium">Chat with Client</span>
              </Link>
            </div>
          )}
          {jobListing.state === 2 && ( // Completed
            <div className="flex flex-wrap gap-3">
              <Link
                to={`/chats/${jobListing.owner}`}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-primary-300 text-primary-600 rounded-lg shadow-sm hover:shadow-md hover:bg-primary-50 transition-all duration-300"
                aria-label="Chat with client"
              >
                <FaComments className="text-sm" />
                <span className="font-medium">Chat with Client</span>
              </Link>
              <button
                onClick={openDisputeModal}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg shadow-sm hover:shadow-md hover:bg-red-50 transition-all duration-300"
                aria-label="Raise a dispute"
              >
                <FaExclamationTriangle className="text-sm" />
                <span className="font-medium">Raise Dispute</span>
              </button>
            </div>
          )}
          {jobListing.state === 3 && ( // Disputed
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-full text-orange-600">
                  <FaExclamationTriangle />
                </div>
                <p className="text-orange-700 font-medium">
                  This project is in dispute. An admin will review the case.
                </p>
              </div>
            </div>
          )}
          {jobListing.state === 4 && ( // Resolved
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full text-green-600">
                    <FaCheckCircle />
                  </div>
                  <div>
                    {jobListing.completionPct > 0 &&
                    jobListing.completionPct < 100 ? (
                      <p className="text-green-700 font-medium">
                        Project resolved through dispute resolution!
                      </p>
                    ) : (
                      <p className="text-green-700 font-medium">
                        Project completed successfully without dispute! Funds
                        paid🎉
                      </p>
                    )}
                  </div>
                </div>

                <div className="ml-11 mt-1">
                  {jobListing.completionPct > 0 &&
                  jobListing.completionPct < 100 ? (
                    <div className="text-md bg-white/70 p-2 rounded border border-green-100">
                      <p>
                        <span className="font-medium">
                          Completion percentage:
                        </span>{" "}
                        {jobListing.completionPct}%
                      </p>
                      <p className="mt-1">
                        <span className="font-medium">Amount received:</span>{" "}
                        {(
                          (((jobListing.finalBudget * (100 - 5)) / 100) *
                            jobListing.completionPct) /
                          100
                        ).toFixed(2)}{" "}
                        USDT
                        <span className="text-sm text-gray-500 ml-1">
                          (After 5% platform fee, based on{" "}
                          {jobListing.completionPct}% of{" "}
                          {jobListing.finalBudget} USDT)
                        </span>
                      </p>
                    </div>
                  ) : (
                    <div className="text-md bg-white/70 p-2 rounded border border-green-100">
                      <p className="font-medium">Full payment received!</p>
                      <p>
                        <span className="font-medium">Amount received:</span>{" "}
                        {(jobListing.finalBudget * 0.95).toFixed(2)} USDT
                        <span className="text-sm text-gray-500 ml-1">
                          (After 5% platform fee, from {jobListing.finalBudget}{" "}
                          USDT budget)
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListingFreelancerActions;
