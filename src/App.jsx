import { Routes, Route } from "react-router-dom";
import {
  Home,
  JobListing,
  MyProjects,
  Chats,
  ViewBidders,
  MyBids,
  MyJobs,
  RecentConversations,
  DisputedProjects,
} from "./pages";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import {
  switchToNetwork,
  addNetwork,
  getNativeBalance,
  getUsdtBalance,
  DEFAULT_NETWORK,
} from "./services/blockchain";
import { NetworkModal, GasFeeModal, MetaMaskModal, UsdtFaucetModal } from "./components";
import { useEffect } from "react";
import { isWalletConnected, loadData } from "./services/blockchain";
import AuthenticatedRoutes from "./utils/AuthenticatedRoutes";
import Authenticate from "./pages/Authenticate";
import { useGlobalState } from "./store";
import {
  CreateJob,
  UpdateJob,
  CompleteJob,
  PlaceBid,
  RaiseDispute,
  ResolveDispute,
  Footer,
} from "./components";
import "react-toastify/dist/ReactToastify.css";
import BrowseJobs from "./pages/BrowseJobs";
import PostJob from "./pages/PostJob";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiesPolicy from "./pages/CookiesPolicy";
import FAQ from "./pages/FAQ";

const App = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [showGasFeeModal, setShowGasFeeModal] = useState(false);
  const [showMetaMaskModal, setShowMetaMaskModal] = useState(false);
  const [showUsdtFaucetModal, setShowUsdtFaucetModal] = useState(false);
  const [dataUpdate] = useGlobalState("dataUpdate");

  // Check if MetaMask is installed
  useEffect(() => {
    if (!window.ethereum) {
      setShowMetaMaskModal(true);
    }
  }, []);

  // Handle network switching when wallet connects
  useEffect(() => {
    const ensureNetwork = async () => {
      if (!window.ethereum) {
        setShowMetaMaskModal(true);
        return;
      }

      if (!connectedAccount) return;

      try {
        // Use the default network
        const switched = await switchToNetwork();
        if (!switched) {
          // Network not added, prompt user
          setShowNetworkModal(true);
        } else {
          // Check gas balance
          const gasBalance = await getNativeBalance(connectedAccount);
          
          // Check USDT balance
          const usdtBalance = await getUsdtBalance(connectedAccount);
          
          // If gas balance is zero, show gas fee modal
          if (parseFloat(gasBalance) === 0) {
            setShowGasFeeModal(true);
          }
          // If USDT balance is zero but has gas, show USDT faucet modal
          else if (parseFloat(usdtBalance) === 0 && parseFloat(gasBalance) > 0) {
            setShowUsdtFaucetModal(true);
          }
        }
      } catch (err) {
        console.error("Network switch failed", err);
        setShowNetworkModal(true);
      }
    };
    ensureNetwork();
  }, [connectedAccount]);

  // 1. Initial wallet check & load data on account change
  useEffect(() => {
    const checkWallet = async () => {
      const connected = await isWalletConnected();
      if (!connected && !window.ethereum) {
        setShowMetaMaskModal(true);
      }
    };
    checkWallet();

    if (connectedAccount) {
      loadData();
    }
  }, [connectedAccount]);

  useEffect(() => {
    if (dataUpdate > 0) {
      loadData();
    }
  }, [dataUpdate]);

  // 2. Whenever any component triggers dataUpdate, reload everything
  useEffect(() => {
    if (connectedAccount) {
      loadData();
    }
  }, [dataUpdate, connectedAccount]);

  // 3. Periodically sync data every 15 seconds to reflect actions from the counter-party
  useEffect(() => {
    const interval = setInterval(() => {
      if (connectedAccount) {
        loadData();
      }
    }, 15000); // 15-second polling

    const handleAccountsChanged = () => {
      window.location.reload();
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  return (
    <div className="min-h-screen font-sans bg-gray-50 flex flex-col">
      <div className="flex-grow pt-16 md:pt-20">
        {" "}
        {/* Padding top to accommodate fixed header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/joblisting/:id" element={<JobListing />} />
          <Route path="/browse-jobs" element={<BrowseJobs />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/myprojects" element={<MyProjects />} />
          <Route path="/viewbidders/:id" element={<ViewBidders />} />
          <Route path="/mybids" element={<MyBids />} />
          <Route path="/myjobs" element={<MyJobs />} />
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookies-policy" element={<CookiesPolicy />} />
          <Route path="/faq" element={<FAQ />} />

          <Route element={<AuthenticatedRoutes />}>
            <Route path="/messages" element={<RecentConversations />} />
            <Route path="/chats/:id" element={<Chats />} />
          </Route>

          <Route path="/disputed-projects" element={<DisputedProjects />} />
        </Routes>
      </div>

      {/* Network modal */}
      <NetworkModal
        visible={showNetworkModal}
        onClose={() => setShowNetworkModal(false)}
        networkKey={DEFAULT_NETWORK.chainName}
        onAddNetwork={async (networkKey) => {
          const added = await addNetwork(networkKey);
          if (added) {
            setShowNetworkModal(false);
            window.location.reload();
          }
        }}
      />

      {/* Gas Fee modal */}
      <GasFeeModal
        visible={showGasFeeModal}
        onClose={() => setShowGasFeeModal(false)}
        walletAddress={connectedAccount}
      />

      {/* MetaMask modal */}
      <MetaMaskModal
        visible={showMetaMaskModal}
        onClose={() => setShowMetaMaskModal(false)}
      />

      {/* USDT Faucet modal */}
      <UsdtFaucetModal
        visible={showUsdtFaucetModal}
        onClose={() => setShowUsdtFaucetModal(false)}
      />

      <CreateJob />
      <UpdateJob />
      <CompleteJob />
      <PlaceBid />
      <RaiseDispute />
      <ResolveDispute />

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="shadow-elevated rounded-lg overflow-hidden"
        bodyClassName="text-sm font-medium"
      />
      <Footer />
    </div>
  );
};

export default App;
