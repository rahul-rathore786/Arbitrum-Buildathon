import React, { useState, useEffect } from "react";
import { truncate } from "../store";
import {
  acceptBid,
  approveSpend,
  getUsdtBalance,
} from "../services/blockchain";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  FaMoneyBill,
  FaUser,
  FaComments,
  FaCheckCircle,
  FaCoins,
  FaSpinner,
} from "react-icons/fa";

import { useGlobalState, setGlobalState } from "../store";

const ApplicantsCard = ({ bidder }) => {
  const navigate = useNavigate();
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [approvingSpend, setApprovingSpend] = useState(false);
  const [acceptingBid, setAcceptingBid] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isApproved, setIsApproved] = useState(bidder.isApproved);

  // Keep local state in sync with props
  useEffect(() => {
    setIsApproved(bidder.isApproved);
  }, [bidder.isApproved]);

  const handleApprove = async (amount) => {
    setApprovingSpend(true);
    try {
      await toast.promise(approveSpend(amount), {
        pending: "Approving spend...",
        success: "Approval successful! You can now accept the bid. 👌",
        error: "Encountered error during approval 🤯",
      });
      // Update local state to show Accept Bid button
      setIsApproved(true);
    } catch (error) {
      console.error("Approval failed:", error);
    } finally {
      setApprovingSpend(false);
    }
  };

  const handleAccept = async (jid, account) => {
    const balance = await getUsdtBalance(connectedAccount);
    if (parseFloat(balance) < parseFloat(bidder.bidAmount)) {
      return toast.error("Insufficient USDT balance to accept this bid");
    }
    setAcceptingBid(true);

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await acceptBid(jid, account)
          .then((tx) => {
            setGlobalState("dataUpdate", (prev) => prev + 1);
            navigate("/myprojects");
            resolve(tx);
          })
          .catch((err) => reject(err));
      }),
      {
        pending: "Accepting bid...",
        success: "Bid accepted successfully! The project has started. 🎉",
        error: "Encountered error while accepting bid 🤯",
      }
    );
    setAcceptingBid(false);
  };

  return (
    <div
      className={`bg-white/95 backdrop-blur-sm shadow-md rounded-xl border border-yellow-500 border-b-3 overflow-hidden mt-4 transition-all duration-300 ${
        hovered
          ? "shadow-lg transform scale-[1.03] border-yellow-500 border-b-3 border-blue-500"
          : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="border-b border-gray-100 bg-gradient-to-r from-secondary-50 to-primary-50 px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-white/80 rounded-full text-primary-600 shadow-sm">
            <FaUser />
          </div>
          <h4 className="font-medium text-gray-800">
            {truncate(bidder.account, 4, 4, 11)}
          </h4>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg w-full md:w-auto">
            <div className="p-2 bg-secondary-100 rounded-full text-secondary-600">
              <FaMoneyBill />
            </div>
            <div>
              <p className="text-xs text-gray-500">Bid Amount</p>
              <p className="font-semibold text-gray-800">${bidder.bidAmount}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            <div className="flex gap-2 flex-wrap">
              <Link
                to={`/chats/${bidder.account}`}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-primary-300 text-primary-600 rounded-lg shadow-sm hover:shadow-md hover:bg-primary-50 transition-all duration-300"
                aria-label="Chat with bidder"
              >
                <FaComments className="text-sm" />
                <span className="font-medium">Chat</span>
              </Link>

              {/* Only show approve button if bid is not approved */}
              {!isApproved && (
                <button
                  onClick={() => handleApprove(bidder.bidAmount)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={approvingSpend}
                  aria-label="Approve spend for this bid"
                >
                  {approvingSpend ? (
                    <>
                      <FaSpinner className="animate-spin text-sm" />
                      <span className="font-medium">Approving...</span>
                    </>
                  ) : (
                    <>
                      <FaCoins className="text-sm" />
                      <span className="font-medium">Approve Spend</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Only show accept bid button if bid is approved */}
            {isApproved && (
              <button
                onClick={() => handleAccept(bidder.jId, bidder.account)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={acceptingBid}
                aria-label="Accept this bid"
              >
                {acceptingBid ? (
                  <>
                    <FaSpinner className="animate-spin text-sm" />
                    <span className="font-medium">Accepting...</span>
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="text-sm" />
                    <span className="font-medium">Accept Bid</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsCard;
