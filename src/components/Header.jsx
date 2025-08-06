import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { connectWallet, getUsdtBalance } from "../services/blockchain";
import { truncate, useGlobalState } from "../store";
import { BsList, BsX } from "react-icons/bs";
import {
  FaWallet,
  FaCoins,
  FaHome,
  FaClipboardList,
  FaBriefcase,
  FaFolder,
  FaComments,
  FaShieldAlt,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import MobileHeader from "./MobileHeader";

const Header = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [isAdmin] = useGlobalState("isAdmin");
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchBalance = async () => {
      const balance = await getUsdtBalance(connectedAccount);
      setBalance(balance);
    };
    fetchBalance();
  }, [connectedAccount]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinkClasses = (path) => {
    return `font-medium px-3 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 ${
      isActive(path)
        ? "text-primary-600 font-semibold bg-gradient-to-r from-primary-50/80 to-secondary-50/80 shadow-sm"
        : "text-gray-600 hover:text-primary-600 hover:bg-white/50 hover:shadow-sm"
    }`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 py-2"
          : "bg-gradient-to-r from-primary-50/50 to-secondary-50/50 backdrop-blur-sm py-4"
      }`}
      aria-label="Site header"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          className="flex items-center group"
          to={"/"}
          aria-label="SafeWorkPay home"
        >
          <div className="mr-2 bg-gradient-to-br from-primary-500 to-secondary-500 text-white p-2 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 hidden sm:flex">
            <FaShieldAlt className="text-xl group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="font-logo text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-primary-500 group-hover:to-secondary-500">
            SafeWorkPay
          </span>
        </Link>

        <nav
          className="items-center space-x-1.5 md:flex hidden"
          aria-label="Main navigation"
        >
          <Link to={"/"} className={navLinkClasses("/")} aria-label="Home page">
            <FaHome
              className={`${
                isActive("/") ? "text-primary-500" : "text-gray-400"
              }`}
            />
            <span>Home</span>
          </Link>
          <Link
            to={"/mybids"}
            className={navLinkClasses("/mybids")}
            aria-label="My Bids page"
          >
            <FaClipboardList
              className={`${
                isActive("/mybids") ? "text-primary-500" : "text-gray-400"
              }`}
            />
            <span>My Bids</span>
          </Link>
          <Link
            to={"/myjobs"}
            className={navLinkClasses("/myjobs")}
            aria-label="My Jobs page"
          >
            <FaBriefcase
              className={`${
                isActive("/myjobs") ? "text-primary-500" : "text-gray-400"
              }`}
            />
            <span>My Jobs</span>
          </Link>
          <Link
            to={"/myprojects"}
            className={navLinkClasses("/myprojects")}
            aria-label="My Projects page"
          >
            <FaFolder
              className={`${
                isActive("/myprojects") ? "text-primary-500" : "text-gray-400"
              }`}
            />
            <span>My Projects</span>
          </Link>
          <Link
            to={"/messages"}
            className={navLinkClasses("/messages")}
            aria-label="Messages page"
          >
            <FaComments
              className={`${
                isActive("/messages") ? "text-primary-500" : "text-gray-400"
              }`}
            />
            <span>Messages</span>
            {/* Notification badge example - can be made dynamic */}
            <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-xs font-medium text-white bg-accent-500 rounded-full animate-pulse-slow">
              2
            </span>
          </Link>

          {isAdmin && (
            <Link
              to={"/disputed-projects"}
              className="font-medium px-3 py-2.5 rounded-lg transition-all duration-300 text-accent-600 hover:bg-accent-50 hover:text-accent-700 font-semibold flex items-center gap-2 border border-accent-200 shadow-sm"
              aria-label="Disputed Projects page"
            >
              <FaShieldAlt className="text-accent-500" />
              <span>Disputed Projects</span>
            </Link>
          )}
        </nav>

        <div className="md:flex hidden">
          {connectedAccount ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="p-1.5 bg-secondary-100 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <FaCoins className="text-secondary-500" />
                </div>
                <span className="text-gray-700 font-medium">
                  {balance} USDT
                </span>
              </div>

              <div className="relative group">
                <div
                  className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-primary-600 hover:to-secondary-600 cursor-pointer"
                  title={connectedAccount}
                  aria-label="Wallet address"
                >
                  <div className="p-1 bg-white/20 rounded-full">
                    <FaWallet className="group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="font-medium">
                    {truncate(connectedAccount, 4, 4, 11)}
                  </span>
                </div>
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-300 to-secondary-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
              </div>

              <button
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-primary-600 transition-all duration-300"
                aria-label="User profile"
              >
                <FaUserCircle className="text-xl" />
              </button>
            </div>
          ) : (
            <button
              className="btn-gradient flex items-center space-x-2 shadow-md hover:shadow-lg active:scale-95 transition-all duration-300"
              onClick={connectWallet}
              aria-label="Connect wallet"
            >
              <div className="p-1 bg-white/20 rounded-full">
                <FaWallet />
              </div>
              <span>Connect Wallet</span>
            </button>
          )}
        </div>

        <div className="md:hidden block relative z-50">
          <button
            className="p-2 rounded-full bg-white/80 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-primary-50/80"
            onClick={handleToggle}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {!isOpen ? (
              <BsList className="text-2xl text-primary-600" />
            ) : (
              <BsX className="text-3xl text-primary-600" />
            )}
          </button>
        </div>
      </div>

      <MobileHeader toggle={handleToggle} isOpen={isOpen} />
    </header>
  );
};

export default Header;
