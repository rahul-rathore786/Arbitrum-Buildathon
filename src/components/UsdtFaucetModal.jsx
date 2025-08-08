import { useState, useEffect } from "react";
import { FaCoins } from "react-icons/fa";
import { toast } from "react-toastify";
import { useGlobalState } from "../store";
import { callUsdtFaucet, getUsdtBalance } from "../services/blockchain";
import { DEFAULT_NETWORK } from "../services/blockchain";

const UsdtFaucetModal = ({ visible, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [usdtBalance, setUsdtBalance] = useState("0");

  useEffect(() => {
    const fetchBalance = async () => {
      if (connectedAccount) {
        const balance = await getUsdtBalance(connectedAccount);
        setUsdtBalance(balance);
      }
    };

    if (visible) {
      fetchBalance();
    }
  }, [visible, connectedAccount]);

  const handleFaucet = async () => {
    setIsLoading(true);
    try {
      await callUsdtFaucet();
      toast.success("Successfully minted 1000 USDT tokens!");
      
      // Update balance after successful mint
      const newBalance = await getUsdtBalance(connectedAccount);
      setUsdtBalance(newBalance);
      
      // Close modal after successful transaction
      onClose();
    } catch (error) {
      console.error("Faucet error:", error);
      toast.error("Failed to mint USDT tokens. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <FaCoins className="h-6 w-6 text-blue-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Get Free USDT Tokens
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    You currently have 0 USDT tokens. Use the faucet to mint 1000 USDT tokens to your wallet.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    This transaction will use a small amount of {DEFAULT_NETWORK.nativeCurrency.symbol} for gas fees.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
              onClick={handleFaucet}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Mint 1000 USDT"}
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsdtFaucetModal;
