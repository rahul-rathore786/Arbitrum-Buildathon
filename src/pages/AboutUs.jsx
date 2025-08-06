import React from "react";
import { Header } from "../components";
import { FaShieldAlt, FaHandshake, FaGlobe, FaBolt } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
            About SafeWorkPay
          </h1>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              SafeWorkPay is revolutionizing the freelancing industry by leveraging blockchain 
              technology to create a secure, transparent, and efficient marketplace for talent. 
              Our mission is to empower freelancers and clients worldwide by eliminating 
              payment disputes, reducing fees, and creating trust through smart contracts.
            </p>
            <p className="text-gray-600">
              We believe in a world where talented individuals can work with clients 
              across the globe without worrying about payment security or third-party 
              intermediaries taking large cuts of their earnings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <FaShieldAlt className="text-primary-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Secure Payments</h3>
              </div>
              <p className="text-gray-600">
                Our escrow-based smart contract system ensures that funds are 
                safely held until work is completed and approved, protecting 
                both freelancers and clients from payment disputes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <FaHandshake className="text-primary-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Fair Dispute Resolution</h3>
              </div>
              <p className="text-gray-600">
                When disagreements occur, our impartial dispute resolution system ensures 
                fair outcomes based on project completion and contractual agreements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <FaGlobe className="text-primary-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Global Opportunity</h3>
              </div>
              <p className="text-gray-600">
                We connect talented freelancers with clients worldwide, breaking 
                down geographical barriers and creating opportunities regardless 
                of location or banking access.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <FaBolt className="text-primary-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Blockchain Efficiency</h3>
              </div>
              <p className="text-gray-600">
                By leveraging the Hyperion blockchain, we provide faster, more 
                cost-effective transactions with transparent records that can't be altered.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Story</h2>
            <p className="text-gray-600 mb-4">
              SafeWorkPay was founded in 2023 by a team of blockchain developers and 
              former freelancers who understood firsthand the challenges faced by 
              independent workers in the digital economy. Frustrated by payment 
              delays, high platform fees, and lack of security in traditional 
              freelancing platforms, our team set out to create a better solution.
            </p>
            <p className="text-gray-600">
              Built on the Hyperion blockchain, SafeWorkPay combines the security and 
              transparency of blockchain technology with a user-friendly interface 
              that makes it accessible to everyone, regardless of their technical expertise.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Technology</h2>
            <p className="text-gray-600 mb-4">
              SafeWorkPay is built on a modern tech stack, with a React frontend and 
              Solidity smart contracts on the Hyperion blockchain. We use the latest 
              security practices and undergo regular code audits to ensure the safety 
              of all transactions on our platform.
            </p>
            <p className="text-gray-600">
              Our DappWorks smart contract handles job creation, bidding, escrow, and 
              dispute resolution, creating a trustless environment where users don't need 
              to rely on intermediaries or blind faith in counterparties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
