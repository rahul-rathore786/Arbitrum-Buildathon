import React, { useEffect } from "react";
import {
  FaPenAlt,
  FaTrashAlt,
  FaMoneyBill,
  FaArrowRight,
  FaTag,
  FaUser,
  FaGithub,
  FaComments,
  FaHandHoldingUsd,
  FaExclamationTriangle,
  FaCheckCircle,
  FaBriefcase,
} from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { setGlobalState, useGlobalState, truncate } from "../store";
import { Link, useNavigate } from "react-router-dom";

const JobListingOwnerActions = ({ jobListing, editable }) => {
  const navigate = useNavigate();

  const openUpdateModal = () => {
    setGlobalState("updateModal", "scale-100");
    setGlobalState("jobListing", jobListing);
  };

  const openPayoutModal = () => {
    setGlobalState("payoutModal", "scale-100");
    setGlobalState("jobListing", jobListing);
  };

  const openDeleteModal = () => {
    setGlobalState("deleteModal", "scale-100");
    setGlobalState("jobListing", jobListing);
  };

  const openDisputeModal = () => {
    setGlobalState("raiseDisputeModal", "scale-100");
    setGlobalState("job", jobListing);
  };

  const viewBidders = (id) => {
    // add dataUpdate state
    setGlobalState("dataUpdate", (prev) => prev + 1);
    navigate(`/viewbidders/${id}`);
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
        {/* BUDGET SECTION RANGE */}
        <div className="flex items-center gap-2 mb-3 bg-gray-50/80 p-2 rounded-lg">
          <div className="p-2 bg-secondary-100 rounded-full text-secondary-600">
            <FaMoneyBill className="text-md" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Budget range</p>
            <span className="font-medium text-gray-700">
              ${jobListing.minBudget} - ${jobListing.maxBudget}
            </span>
          </div>
        </div>
        {/*show final budget when job is in progress */}
        {jobListing.state >= 1 && (
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
        )}
        {/* Tags */}
        <div className="flex items-center mt-4 text-md flex-wrap gap-2">
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

        {/* Freelancer info if assigned */}
        {jobListing.freelancer !==
          "0x0000000000000000000000000000000000000000" && (
          <div className="flex items-center gap-3 mb-3 bg-primary-50/50 p-2 rounded-lg">
            <div className="p-2 bg-primary-100 rounded-full text-primary-600">
              <FaUser className="text-md" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Assigned Freelancer</p>
              <p className="font-medium text-primary-700">
                {truncate(jobListing.freelancer, 4, 4, 11)}
              </p>
            </div>
          </div>
        )}

        {/* Submitted work section */}
        {jobListing.state >= 2 && jobListing.githubUrl && (
          <div className="mb-3 bg-secondary-50/50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FaGithub className="text-secondary-700" />
              <h5 className="font-medium text-secondary-800">Submitted Work</h5>
            </div>
            <a
              href={jobListing.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary-600 hover:text-primary-700 flex items-center gap-2 bg-white/80 py-2 px-3 rounded-md shadow-sm hover:shadow transition-all duration-300"
              aria-label="View submitted work on GitHub"
            >
              <span className="text-md text-blue-600 underline">
                {jobListing.githubUrl}
              </span>
              <FaArrowRight className="text-xs" />
            </a>
          </div>
        )}
        {/* Status-based action buttons */}
        <div className="border-t border-gray-100 pt-3 mt-2">
          {editable && (
            <>
              {jobListing.state === 0 && (
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={openUpdateModal}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-primary-300 text-primary-600 rounded-lg shadow-sm hover:shadow-md hover:bg-primary-50 transition-all duration-300"
                    aria-label="Update job listing"
                  >
                    <FaPenAlt className="text-sm" />
                    <span className="font-medium">Update</span>
                  </button>

                  <button
                    onClick={openDeleteModal}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg shadow-sm hover:shadow-md hover:bg-red-50 transition-all duration-300"
                    aria-label="Delete job listing"
                  >
                    <FaTrashAlt className="text-sm" />
                    <span className="font-medium">Delete</span>
                  </button>

                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg shadow-md hover:shadow-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300"
                    onClick={() => viewBidders(jobListing.id)}
                    aria-label="View bidders for this job"
                  >
                    <span className="font-medium">View Bidders</span>
                    <FaArrowRight />
                  </button>
                </div>
              )}

              {jobListing.state === 1 && (
                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/chats/${jobListing.freelancer}`}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-primary-300 text-primary-600 rounded-lg shadow-sm hover:shadow-md hover:bg-primary-50 transition-all duration-300"
                    aria-label="Chat with freelancer"
                  >
                    <FaComments className="text-sm" />
                    <span className="font-medium">Chat with Freelancer</span>
                  </Link>
                </div>
              )}

              {jobListing.state === 2 && (
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={openPayoutModal}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-primary-500 text-white rounded-lg shadow-md hover:shadow-lg hover:from-secondary-600 hover:to-primary-600 transition-all duration-300"
                    aria-label="Pay freelancer"
                  >
                    <FaHandHoldingUsd className="text-sm" />
                    <span className="font-medium">Pay Freelancer</span>
                  </button>

                  <Link
                    to={`/chats/${jobListing.freelancer}`}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-primary-300 text-primary-600 rounded-lg shadow-sm hover:shadow-md hover:bg-primary-50 transition-all duration-300"
                    aria-label="Chat with freelancer"
                  >
                    <FaComments className="text-sm" />
                    <span className="font-medium">Chat with Freelancer</span>
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

              {jobListing.state === 3 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-full text-orange-600">
                      <FaExclamationTriangle />
                    </div>
                    <p className="text-orange-700 font-medium">
                      This project is in dispute. An admin is reviewing the
                      case. You will be notified of the outcome.
                    </p>
                  </div>
                </div>
              )}

              {jobListing.state === 4 && (
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
                            Project successfully completed and payment
                            processed!
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
                              Resolution details:
                            </span>{" "}
                            {jobListing.completionPct}% of budget paid to
                            freelancer
                          </p>
                          <p className="mt-1">
                            <span className="font-medium">
                              Refund received:
                            </span>{" "}
                            {(
                              (((jobListing.finalBudget * (100 - 5)) / 100) *
                                (100 - jobListing.completionPct)) /
                              100
                            ).toFixed(2)}{" "}
                            USDT
                            <span className="text-xs text-gray-500 ml-1">
                              (After platform fee,{" "}
                              {100 - jobListing.completionPct}% of budget
                              returned)
                            </span>
                          </p>
                          <p className="mt-1">
                            <span className="font-medium">Platform fee:</span>{" "}
                            {(jobListing.finalBudget * 0.05).toFixed(2)} USDT
                            (5%)
                          </p>
                        </div>
                      ) : (
                        <div className="text-md bg-white/70 p-2 rounded border border-green-100">
                          <p className="font-medium">Payment details</p>
                          <p>
                            <span className="font-medium">
                              Total paid to freelancer:
                            </span>{" "}
                            {(jobListing.finalBudget * 0.95).toFixed(2)} USDT
                          </p>
                          <p className="mt-1">
                            <span className="font-medium">Platform fee:</span>{" "}
                            {(jobListing.finalBudget * 0.05).toFixed(2)} USDT
                            (5%)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListingOwnerActions;
