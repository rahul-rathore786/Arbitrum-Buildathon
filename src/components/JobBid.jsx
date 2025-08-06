import React from "react";
import {
  FaMoneyBillWave,
  FaTag,
  FaUserCircle,
  FaCommentAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { truncate, useGlobalState, setGlobalState } from "../store";

const JobBid = ({ jobListing }) => {
  const [connectedAccount] = useGlobalState("connectedAccount");

  const getBidStatus = () => {
    if (jobListing.freelancer === connectedAccount) {
      return {
        message: 'Bid accepted! You can now find this project in "My Jobs".',
        status: "accepted",
        color: "text-green-600",
        bgColor: "bg-green-100",
        icon: <FaCheckCircle className="text-green-600" />,
      };
    }

    if (
      jobListing.freelancer !== "0x0000000000000000000000000000000000000000" &&
      jobListing.freelancer !== connectedAccount
    ) {
      return {
        message: "Bid rejected. The client selected another freelancer.",
        status: "rejected",
        color: "text-red-600",
        bgColor: "bg-red-100",
        icon: <FaTimesCircle className="text-red-600" />,
      };
    }

    if (jobListing.state === 0) {
      return {
        message: "Applied and waiting for acceptance.",
        status: "pending",
        color: "text-amber-600",
        bgColor: "bg-amber-100",
        icon: <FaHourglassHalf className="text-amber-600" />,
      };
    }

    return null;
  };

  const bidStatus = getBidStatus();

  return (
    <div className="card mb-6 overflow-visible hover:translate-y-[-2px] hover:scale-[1.02] transition-all duration-300">
      {/* Status banner at top if there is a status */}
      {bidStatus && (
        <div
          className={`flex items-center gap-2 p-3 ${bidStatus.bgColor} border-b border-gray-100 rounded-xl`}
        >
          {bidStatus.icon}
          <p className={`text-sm font-medium ${bidStatus.color}`}>
            {bidStatus.message}
          </p>
        </div>
      )}

      <div className="p-5">
        {/* Job title */}
        <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
          {jobListing.jobTitle}
        </h3>

        {/* Budget badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium">
          <FaMoneyBillWave className="mr-1" />${jobListing.minBudget} - $
          {jobListing.maxBudget}
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

        {/* Description */}
        <p className="mt-4 text-gray-600 text-md line-clamp-3">
          {jobListing.description}
        </p>

        {/* Client info */}
        <div className="flex items-center mt-5 py-3 border-t border-gray-300">
          <FaUserCircle className="text-gray-400 text-lg mr-2" />
          <p className="text-sm text-gray-700">
            Client:{" "}
            <span className="font-medium">
              {truncate(jobListing.owner, 4, 4, 11)}
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="mt-4 flex justify-end">
          {bidStatus?.status !== "rejected" && (
            <Link
              to={`/chats/${jobListing.owner}`}
              className="btn-secondary inline-flex items-center gap-2 text-sm py-2"
            >
              <FaCommentAlt className="text-xs" />
              Chat with Client
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobBid;
