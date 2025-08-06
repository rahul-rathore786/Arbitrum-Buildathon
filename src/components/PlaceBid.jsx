import { useState } from "react";
import { FaTimes, FaMoneyBillWave, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { bidForJob } from "../services/blockchain";
import { useGlobalState, setGlobalState } from "../store";
import { useNavigate } from "react-router-dom";

const PlaceBid = () => {
  const [placeBidModal] = useGlobalState("placeBidModal");
  const [jobListing] = useGlobalState("jobListing");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid bid amount.");
      return;
    }

    setIsLoading(true);

    await toast
      .promise(bidForJob(jobListing.id, amount), {
        pending: "Approving & Bidding...",
        success: "Application successful 👌",
        error: "Encountered error 🤯",
      })
      .then(() => {
        closeModal();
        setGlobalState("dataUpdate", (prev) => prev + 1);
        navigate("/mybids");
      })
      .catch(() => {});

    setIsLoading(false);
  };

  const closeModal = () => {
    setGlobalState("placeBidModal", "scale-0");
    setAmount("");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/60 backdrop-blur-sm transform transition-transform duration-300 z-50 ${placeBidModal}`}
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div
        className="bg-white/90 backdrop-blur-md shadow-elevated rounded-2xl w-11/12 md:w-2/5 max-w-md p-6 border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <h3 className="font-display font-bold text-xl bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Place Your Bid
            </h3>
            <button
              type="button"
              aria-label="Close modal"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-200"
              onClick={closeModal}
            >
              <FaTimes />
            </button>
          </div>

          <div className="my-6">
            <label htmlFor="bid-amount" className="form-label block mb-2">
              Your Bid Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaMoneyBillWave className="text-gray-500" />
              </div>
              <input
                id="bid-amount"
                className="form-input pl-10 w-full"
                type="number"
                step="0.01"
                min="0.01"
                name="amount"
                placeholder="Bid Amount (USDT)"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                required
                aria-label="Bid amount in USDT"
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Make your best offer. Remember that the job owner is looking for
              the right balance of quality and cost.
            </div>
          </div>

          {jobListing && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="text-sm font-medium text-gray-700">Job Details</h4>
              <p className="text-sm text-gray-600 mt-1">
                {jobListing.jobTitle}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="badge-primary">
                  ${jobListing.minBudget} - ${jobListing.maxBudget}
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn-gradient w-full py-3 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" />
                Processing...
              </>
            ) : (
              "Submit Bid"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlaceBid;
