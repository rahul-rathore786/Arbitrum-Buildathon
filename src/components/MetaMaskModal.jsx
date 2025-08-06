import React from "react";
import { FaTimes, FaWallet } from "react-icons/fa";

const MetaMaskModal = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-4">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
              <FaWallet className="text-white text-xl" />
            </div>
            <h2 className="text-xl font-bold text-white flex-grow">
              MetaMask Required
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <img
              src="/metamask-fox.svg"
              alt="MetaMask Logo"
              className="w-20 h-20"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://lh3.googleusercontent.com/EQpmNpyWc98Rhu0bDzuPPS8ivQN2xZoc-saVhYHm5394wqS6eCRI5KyQFtxQf1z-OgS5HYVxvnUX8iv3uWy5jM2maw=s60";
              }}
            />
          </div>

          <div className="mb-6 text-gray-700">
            <p className="mb-4">
              SafeWorkPay requires MetaMask to interact with the Hyperion
              blockchain. Please install the MetaMask extension to continue.
            </p>
            <div className="bg-gray-50 p-3 rounded-md border-l-4 border-primary-400 text-sm mb-6">
              <p>
                MetaMask is a secure wallet for accessing Web3 applications and
                managing your digital assets.
              </p>
            </div>
          </div>

          <a
            href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-block py-3 px-6 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium rounded-lg transition-all duration-200 text-center"
          >
            Install MetaMask
          </a>

          <div className="mt-5 text-center">
            <p className="text-sm text-gray-500">
              After installation, please refresh this page
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaMaskModal;
