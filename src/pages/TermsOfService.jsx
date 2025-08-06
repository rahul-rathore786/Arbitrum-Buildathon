import React from "react";
import { Header } from "../components";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Terms of Service</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
              <p>
                Welcome to SafeWorkPay. By accessing or using our platform, you agree to be bound by these 
                Terms of Service ("Terms"). If you disagree with any part of these Terms, you may not use 
                our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Description of Service</h2>
              <p>
                SafeWorkPay is a blockchain-based freelancing platform that connects clients with freelancers 
                and facilitates secure transactions through smart contracts on the Hyperion blockchain. Our 
                services include:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Job posting and bidding</li>
                <li>Escrow services for project payments</li>
                <li>Project collaboration tools</li>
                <li>Dispute resolution services</li>
                <li>Blockchain-based payment processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. User Accounts</h2>
              <p>
                To use our platform, you must create an account by connecting a compatible blockchain wallet.
                You are responsible for:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Maintaining the security of your private keys and wallet</li>
                <li>All activities that occur under your account</li>
                <li>Ensuring your account information is accurate and up-to-date</li>
              </ul>
              <p className="mt-2">
                We reserve the right to suspend or terminate your account if we detect fraudulent, 
                abusive, or illegal activity.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Smart Contract Interactions</h2>
              <p>
                By using SafeWorkPay, you acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  All transactions are governed by the immutable code of the underlying smart contracts, 
                  which execute automatically once the conditions are met
                </li>
                <li>
                  Blockchain transactions cannot be reversed, and SafeWorkPay has limited ability to 
                  recover funds once a transaction is confirmed on the blockchain
                </li>
                <li>
                  You understand the risks involved in using blockchain technology and cryptocurrency
                </li>
                <li>
                  You are responsible for paying any gas fees required to process your transactions 
                  on the blockchain
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. User Conduct</h2>
              <p>
                As a user of SafeWorkPay, you agree not to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Use our services for any illegal purposes</li>
                <li>Post false, inaccurate, or misleading information</li>
                <li>
                  Attempt to manipulate, bypass, or interfere with the platform's security features or smart contracts
                </li>
                <li>Harass, abuse, or harm other users</li>
                <li>Infringe on the intellectual property rights of others</li>
                <li>
                  Post or transmit any content that is offensive, defamatory, or otherwise objectionable
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Fees and Payments</h2>
              <p>
                SafeWorkPay charges a platform fee for facilitating transactions between clients and freelancers. 
                Current fee structures are visible on the platform and may be updated from time to time.
              </p>
              <p className="mt-2">
                All payments are made in cryptocurrency (USDT) through the platform's smart contracts. You 
                understand that cryptocurrency values may fluctuate, and SafeWorkPay is not responsible for any 
                losses due to market volatility.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Dispute Resolution</h2>
              <p>
                In the event of a dispute between a client and a freelancer, our platform provides an automated 
                dispute resolution mechanism governed by smart contract logic. By using our services, you agree to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Submit disputes through the platform's designated dispute resolution system</li>
                <li>
                  Provide truthful information and evidence related to your dispute
                </li>
                <li>
                  Accept the outcome of the dispute resolution process as determined by the smart contract 
                  and/or platform administrators
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Intellectual Property</h2>
              <p>
                The content, features, and functionality of SafeWorkPay are owned by us and protected by 
                international copyright, trademark, and other intellectual property laws.
              </p>
              <p className="mt-2">
                For work created and delivered through our platform, the intellectual property rights transfer 
                from freelancer to client only upon full payment and project completion, unless otherwise 
                specified in a separate agreement between the parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, SafeWorkPay shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages, including loss of profits, 
                data, or business opportunity, arising out of or in connection with these Terms or your use 
                of the platform.
              </p>
              <p className="mt-2">
                We specifically disclaim liability for:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>User-generated content and communications</li>
                <li>
                  The quality or accuracy of work delivered by freelancers
                </li>
                <li>
                  Technical issues or delays related to blockchain transactions outside our control
                </li>
                <li>
                  Losses resulting from unauthorized access to your wallet or account
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of significant 
                changes by posting an update on our platform. Your continued use of SafeWorkPay after such 
                changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">11. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of 
                California, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">12. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="mt-2">
                <p>Email: legal@safeworkpay.com</p>
                <p>Address: 123 Blockchain Avenue, Silicon Valley, CA 94025, United States</p>
              </div>
            </section>

            <div className="text-sm text-gray-500 mt-8 border-t pt-4">
              Last updated: July 29, 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
