import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { NETWORKS } from "../utils/chain";
const NetworkModal = ({ visible, onClose, onAddNetwork, networkKey }) => {
  // Find the network key that matches the incoming networkKey (which is a chainName)
  const initialNetworkKey = Object.keys(NETWORKS).find(key => NETWORKS[key].chainName === networkKey) || Object.keys(NETWORKS)[0];
  const [selectedNetworkKey, setSelectedNetworkKey] = useState(initialNetworkKey);

  
  if (!visible) return null;
  
  const network = NETWORKS[selectedNetworkKey];
  
  const handleNetworkChange = (e) => {
    setSelectedNetworkKey(e.target.value);
  };
  
  const handleAddNetwork = () => {
    onAddNetwork(selectedNetworkKey);
  };

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
          Add Network to MetaMask
        </h2>
        <p className="text-gray-600 mb-4 text-sm">
          To use SafeWorkPay you need to connect to the correct network. You can
          add the network to MetaMask with a single click using the details
          below:
        </p>
        
        <div className="mb-4">
          <label htmlFor="network-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select Network
          </label>
          <select
            id="network-select"
            value={selectedNetworkKey}
            onChange={handleNetworkChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          >
            {Object.keys(NETWORKS).map((key) => (
              <option key={key} value={key}>
                {NETWORKS[key].chainName}
              </option>
            ))}
          </select>
        </div>
        
        <div className="text-sm bg-gray-50 border border-gray-200 rounded-md p-4 mb-4 space-y-1">
          <p>
            <span className="font-medium">Network:</span> {network.chainName}
          </p>
          <p>
            <span className="font-medium">Chain ID:</span> {network.chainIdDecimal}
          </p>
          <p>
            <span className="font-medium">Currency Symbol:</span> {network.nativeCurrency.symbol}
          </p>
          <p>
            <span className="font-medium">RPC:</span>{" "}
            {network.rpcUrls[0]}
          </p>
          <p>
            <span className="font-medium">Block Explorer:</span>{" "}
            {network.blockExplorerUrls[0]}
          </p>
        </div>
        <button
          onClick={handleAddNetwork}
          className="w-full py-3 px-6 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium rounded-lg transition-all duration-200"
        >
          Add {network.chainName} to MetaMask
        </button>
      </div>
    </div>
  );
};

export default NetworkModal;
