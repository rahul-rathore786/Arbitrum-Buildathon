import React from "react";
import { FaTimes } from "react-icons/fa";

const NetworkModal = ({ visible, onClose, onAddNetwork }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Add Hyperion Testnet
        </h2>
        <p className="text-gray-600 mb-4 text-sm">
          To use SafeWorkPay you need to connect to the Hyperion Testnet. You can
          add the network to MetaMask with a single click using the details
          below:
        </p>
        <div className="text-sm bg-gray-50 border border-gray-200 rounded-md p-4 mb-4 space-y-1">
          <p>
            <span className="font-medium">Network:</span> Hyperion (Testnet)
          </p>
          <p>
            <span className="font-medium">Chain ID:</span> 133717
          </p>
          <p>
            <span className="font-medium">Currency Symbol:</span> htMETIS
          </p>
          <p>
            <span className="font-medium">RPC:</span>{" "}
            https://hyperion-testnet.metisdevops.link
          </p>
          <p>
            <span className="font-medium">Block Explorer:</span>{" "}
            https://hyperion-testnet-explorer.metisdevops.link
          </p>
        </div>
        <button
          onClick={onAddNetwork}
          className="w-full py-3 px-6 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium rounded-lg transition-all duration-200"
        >
          Add Network to MetaMask
        </button>
      </div>
    </div>
  );
};

export default NetworkModal;
