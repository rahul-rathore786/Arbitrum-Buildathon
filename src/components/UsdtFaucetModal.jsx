import { useState, useEffect } from "react";
import { FaCoins, FaInfoCircle } from "react-icons/fa";
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
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Modal backdrop */}
        <div className="modal-backdrop" onClick={onClose}></div>
        
        {/* Modal content */}
        <div className="card">
          {/* Modal header */}
          <div className="card-header">
            <div className="header-content">
              <div className="header-icon">
                <FaCoins />
              </div>
              <div className="header-text">
                <h2>USDT Faucet</h2>
                <p>Get test tokens for the platform</p>
              </div>
            </div>
          </div>
          
          {/* Modal body */}
          <div className="card-body">
            <div className="info-box">
              <div className="info-icon">
                <FaInfoCircle />
              </div>
              <div className="info-content">
                <p>You currently have <span className="highlight">0 USDT</span> tokens in your wallet.</p>
                <p>Use this faucet to mint <span className="highlight">1000 USDT</span> tokens for testing.</p>
                <p className="text-sm text-muted mt-2">
                  This transaction will use a small amount of {DEFAULT_NETWORK.nativeCurrency.symbol} for gas fees.
                </p>
              </div>
            </div>
            
            {/* Token details */}
            <div className="token-details">
              <div className="token-info">
                <span className="token-label">Token:</span>
                <span className="token-value">USDT (Tether)</span>
              </div>
              <div className="token-info">
                <span className="token-label">Amount:</span>
                <span className="token-value">1,000 USDT</span>
              </div>
              <div className="token-info">
                <span className="token-label">Network:</span>
                <span className="token-value">{DEFAULT_NETWORK.chainName}</span>
              </div>
            </div>
          </div>
          
          {/* Modal footer */}
          <div className="card-footer">
            <div className="btn-group">
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`btn-primary ${isLoading ? 'btn-loading' : ''}`}
                onClick={handleFaucet}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Mint 1000 USDT"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsdtFaucetModal;
