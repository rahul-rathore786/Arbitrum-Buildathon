import React, { useState } from "react";
import { Header } from "../components";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQ = () => {
  const [openItem, setOpenItem] = useState(0);

  const faqItems = [
    {
      question: "What is SafeWorkPay?",
      answer: "SafeWorkPay is a blockchain-based freelancing platform that connects clients with skilled freelancers while providing secure payment and project delivery through smart contracts. Our platform uses the Hyperion blockchain to ensure transparent, secure transactions with escrow protection and fair dispute resolution."
    },
    {
      question: "How do I get started as a freelancer?",
      answer: "To get started as a freelancer on SafeWorkPay, first connect your cryptocurrency wallet (like MetaMask). Then create your profile, browse available jobs, and submit bids on projects that match your skills. Once a client accepts your bid, you can begin working on the project with payment secured in an escrow smart contract."
    },
    {
      question: "How do I get started as a client?",
      answer: "As a client, connect your cryptocurrency wallet to SafeWorkPay, then click 'Post a Job' to create a new listing with your project details, requirements, and budget. Once freelancers submit bids, you can review their profiles and proposals before accepting the best match for your project. Funds are held in escrow until you approve the completed work."
    },
    {
      question: "What cryptocurrencies does SafeWorkPay accept?",
      answer: "Currently, SafeWorkPay operates using USDT (Tether) on the Hyperion blockchain. This provides a stable value for transactions while benefiting from the security and transparency of blockchain technology. You'll need USDT in your wallet to fund projects or withdraw earnings."
    },
    {
      question: "How is my payment secured?",
      answer: "Payments on SafeWorkPay are secured through smart contract escrow. When you hire a freelancer, your payment is locked in a smart contract that automatically releases funds when predefined conditions are met. This protects both parties, as funds cannot be released until the client approves the work or a dispute is resolved."
    },
    {
      question: "What happens if there's a dispute between a client and freelancer?",
      answer: "If a dispute arises, either party can initiate our dispute resolution process through the platform. The project enters a 'Disputed' state, where both parties can provide evidence and explanations. Our smart contract-based dispute resolution system then evaluates the case based on project completion and contractual terms to reach a fair outcome."
    },
    {
      question: "What fees does SafeWorkPay charge?",
      answer: "SafeWorkPay charges a small platform fee on successful transactions to maintain the platform and continue development. These fees are significantly lower than traditional freelancing platforms, as blockchain technology allows us to operate with minimal overhead. Exact fee details are displayed during the transaction process."
    },
    {
      question: "How do I withdraw my earnings?",
      answer: "Once a project is completed and the client approves your work, the smart contract automatically releases the funds to your connected wallet address. There's no additional withdrawal process needed – the cryptocurrency is sent directly to your wallet, where you have full control over your earnings."
    },
    {
      question: "Is my personal information secure on SafeWorkPay?",
      answer: "We prioritize user privacy and security. While blockchain transactions are publicly visible (showing wallet addresses and transaction amounts), personal identifying information is stored securely and separately. We implement industry-standard security measures to protect user data and only collect essential information needed for platform functionality."
    },
    {
      question: "Do I need technical knowledge to use SafeWorkPay?",
      answer: "SafeWorkPay is designed to be user-friendly, even for those new to blockchain technology. While basic knowledge of cryptocurrency wallets (like MetaMask) is helpful, our intuitive interface guides you through the process. We also provide documentation and support resources to help you navigate the platform easily."
    }
  ];

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? -1 : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
            Frequently Asked Questions
          </h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  className="flex justify-between items-center w-full p-5 text-left"
                  onClick={() => toggleItem(index)}
                >
                  <span className="text-lg font-semibold text-gray-800">
                    {item.question}
                  </span>
                  <span className="text-primary-600">
                    {openItem === index ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>
                
                {openItem === index && (
                  <div className="p-5 pt-0 text-gray-600">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              We're here to help. Reach out to our support team for any additional questions.
            </p>
            <a
              href="/contact"
              className="inline-block py-3 px-6 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium rounded-lg transition-all duration-200"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
