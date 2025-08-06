import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connectWallet, getUsdtBalance } from '../services/blockchain'
import { truncate, useGlobalState } from '../store'
import { useState } from 'react'
import { FaWallet, FaCoins, FaHome, FaClipboardList, FaBriefcase, FaFolder, FaComments, FaShieldAlt, FaUserCircle, FaAngleRight } from 'react-icons/fa'

const MobileHeader = ({ toggle, isOpen }) => {
  const menuRef = useRef(null)
  const [connectedAccount] = useGlobalState('connectedAccount')
  const [isAdmin] = useGlobalState('isAdmin')
  const [balance, setBalance] = useState('')
  const location = useLocation()

  useEffect(() => {
    const fetchBalance = async () => {
      const balance = await getUsdtBalance(connectedAccount)
      setBalance(balance)
    }
    fetchBalance()
  }, [connectedAccount])

  const isActive = (path) => {
    return location.pathname === path
  }
  
  const navLinkClasses = (path) => {
    return `flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-300 ${isActive(path) 
      ? 'text-primary-600 bg-gradient-to-r from-primary-50/80 to-secondary-50/80 font-semibold shadow-sm' 
      : 'text-gray-600 hover:text-primary-600 hover:bg-white/80 hover:shadow-sm'}`
  }

  return (
    <div 
      className={`fixed inset-0 z-50 md:hidden ${isOpen ? 'block' : 'hidden'} h-full w-full`}
      id="mobile-menu"
      aria-modal="true"
      role="dialog"
      aria-label="Mobile navigation menu"
      style={{ height: '100vh' }}
      onClick={(e) => {
        // Close menu when clicking outside of it
        if (e.target === e.currentTarget) {
          toggle()
        }
      }}
    >
      <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md" aria-hidden="true" />
      
      <nav 
        ref={menuRef}
        className={`fixed right-0 top-0 bottom-0 w-80 max-w-sm bg-white/95 backdrop-blur-sm shadow-2xl flex flex-col overflow-y-auto h-full transform transition-all duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-label="Mobile navigation"
        style={{ height: '100vh', overflowY: 'auto' }}
      >
        <div className="border-b border-gray-200 pb-5 mb-4 pt-2 px-6">
          <div className="flex items-center mb-5">
            <div className="mr-3 bg-gradient-to-br from-primary-500 to-secondary-500 text-white p-2 rounded-lg shadow-md">
              <FaShieldAlt className="text-xl" />
            </div>
            <div className="font-logo text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              SafeWorkPay
            </div>
          </div>
          
          {connectedAccount ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2 px-3 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg shadow-sm group w-full">
                  <div className="p-1.5 bg-secondary-100 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <FaCoins className="text-secondary-500" />
                  </div>
                  <span className="text-gray-700 font-medium">{balance} USDT</span>
                </div>
                
                <div className="p-2 ml-2 rounded-full bg-gray-100 border border-gray-200 text-gray-600">
                  <FaUserCircle className="text-xl" />
                </div>
              </div>
              
              <div 
                className="flex items-center justify-between px-3 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                title={connectedAccount}
              >
                <div className="flex items-center space-x-2">
                  <div className="p-1 bg-white/20 rounded-full">
                    <FaWallet />
                  </div>
                  <span className="font-medium">{truncate(connectedAccount, 4, 4, 11)}</span>
                </div>
                <div className="bg-white/20 rounded-full h-5 w-5 flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
              </div>
            </div>
          ) : (
            <button
              className="btn-gradient flex items-center justify-center space-x-2 w-full py-3 shadow-md hover:shadow-lg active:scale-95 transition-all duration-300"
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
        
        <div className="flex flex-col space-y-2 px-4 pt-2">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 px-2">Menu</h3>
          
          <Link to={'/'} className={navLinkClasses('/')} aria-label="Home page">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-md ${isActive('/') ? 'bg-primary-100' : 'bg-gray-100'}`}>
                <FaHome className={`${isActive('/') ? 'text-primary-500' : 'text-gray-500'}`} />
              </div>
              <span>Home</span>
            </div>
            <FaAngleRight className="text-gray-400" />
          </Link>
          
          <Link to={'/mybids'} className={navLinkClasses('/mybids')} aria-label="My Bids page">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-md ${isActive('/mybids') ? 'bg-primary-100' : 'bg-gray-100'}`}>
                <FaClipboardList className={`${isActive('/mybids') ? 'text-primary-500' : 'text-gray-500'}`} />
              </div>
              <span>My Bids</span>
            </div>
            <FaAngleRight className="text-gray-400" />
          </Link>
          
          <Link to={'/myjobs'} className={navLinkClasses('/myjobs')} aria-label="My Jobs page">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-md ${isActive('/myjobs') ? 'bg-primary-100' : 'bg-gray-100'}`}>
                <FaBriefcase className={`${isActive('/myjobs') ? 'text-primary-500' : 'text-gray-500'}`} />
              </div>
              <span>My Jobs</span>
            </div>
            <FaAngleRight className="text-gray-400" />
          </Link>
          
          <Link to={'/myprojects'} className={navLinkClasses('/myprojects')} aria-label="My Projects page">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-md ${isActive('/myprojects') ? 'bg-primary-100' : 'bg-gray-100'}`}>
                <FaFolder className={`${isActive('/myprojects') ? 'text-primary-500' : 'text-gray-500'}`} />
              </div>
              <span>My Projects</span>
            </div>
            <FaAngleRight className="text-gray-400" />
          </Link>
          
          <Link to={'/messages'} className={navLinkClasses('/messages')} aria-label="Messages page">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-md ${isActive('/messages') ? 'bg-primary-100' : 'bg-gray-100'}`}>
                <FaComments className={`${isActive('/messages') ? 'text-primary-500' : 'text-gray-500'}`} />
              </div>
              <span>Messages</span>
              <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-xs font-medium text-white bg-accent-500 rounded-full">2</span>
            </div>
            <FaAngleRight className="text-gray-400" />
          </Link>

          {isAdmin && (
            <>
              <div className="border-t border-gray-100 my-2"></div>
              <h3 className="text-xs font-medium text-accent-500 uppercase tracking-wider mb-1 px-2">Admin</h3>
              <Link 
                to={'/disputed-projects'} 
                className="flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-300 text-accent-600 hover:bg-accent-50/80 shadow-sm border border-accent-100"
                aria-label="Disputed Projects page"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-md bg-accent-100">
                    <FaShieldAlt className="text-accent-500" />
                  </div>
                  <span className="font-semibold">Disputed Projects</span>
                </div>
                <FaAngleRight className="text-accent-400" />
              </Link>
            </>
          )}
          
          <div className="border-t border-gray-100 my-3 pt-3">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 shadow-inner">
              <h3 className="font-medium text-gray-700 mb-1">Need help?</h3>
              <p className="text-sm text-gray-600 mb-3">Contact support for assistance with your account or transactions.</p>
              <button className="bg-white/80 text-primary-600 font-medium py-2 px-4 rounded-lg text-sm w-full shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default MobileHeader
