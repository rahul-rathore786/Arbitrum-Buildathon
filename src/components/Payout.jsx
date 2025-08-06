import React, { useState } from "react";
import { useGlobalState, setGlobalState } from "../store";
import { MdAttachMoney } from "react-icons/md";
import { FaTimes, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { payout } from "../services/blockchain";
import { useNavigate } from "react-router-dom";

const Payout = () => {
  const [payoutModal] = useGlobalState("payoutModal");
  const [jobListing] = useGlobalState("jobListing");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    setGlobalState("payoutModal", "scale-0");
    setGlobalState("jobListing", null);
  };

  const handlePayout = async () => {
    setIsProcessing(true);
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await payout(jobListing.id)
          .then(async () => {
            closeModal();
            setGlobalState("dataUpdate", (prev) => prev + 1);
            navigate("/myprojects");
            resolve();
          })
          .catch((error) => {
            console.error('Error processing payout:', error);
            reject(error);
          });
      }),
      {
        pending: "Processing payment...",
        success: "Payment sent successfully! 👌",
        error: "Payment failed. Please try again. 🤯",
      }
    );
    setIsProcessing(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
      bg-black/50 backdrop-blur-sm z-50 transition-transform duration-300 ${payoutModal}`}
      onClick={closeModal}
      aria-modal="true" 
      role="dialog"
      aria-labelledby="payout-job-title"
    >
      <div 
        className="bg-white/95 backdrop-blur-xl shadow-elevated rounded-2xl w-11/12 max-w-md overflow-hidden transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-100 bg-gradient-to-r from-primary-50 to-secondary-50 px-6 py-4 rounded-t-2xl relative">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/80 backdrop-blur-sm rounded-full text-primary-600 shadow-sm">
              <MdAttachMoney className="text-2xl" />
            </div>
            <h3 id="payout-job-title" className="font-semibold text-lg bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">
              Confirm Payment
            </h3>
          </div>
          <button 
            onClick={closeModal}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-1.5 text-gray-500 hover:text-primary-500 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h4 className="font-medium text-gray-800 mb-4">
              Are you sure you want to process payment for this job?
            </h4>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
              <p className="text-sm text-blue-700">
                This will release the funds from escrow to the freelancer. This action cannot be undone once confirmed.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={closeModal}
              className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-all duration-200 flex items-center gap-2"
              disabled={isProcessing}
              aria-label="Cancel payment"
            >
              Cancel
            </button>
            <button
              onClick={handlePayout}
              className="py-2 px-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70"
              disabled={isProcessing}
              aria-label="Process payment"
            >
              {isProcessing ? (
                <>
                  <FaSpinner className="animate-spin text-sm" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <FaCheckCircle className="text-sm" />
                  <span>Confirm Payment</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payout;
