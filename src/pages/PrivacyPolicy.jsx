import React from "react";
import { Header } from "../components";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Introduction</h2>
              <p>
                At SafeWorkPay ("we," "our," or "us"), we respect your privacy and are committed 
                to protecting your personal data. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you use our blockchain-based 
                freelancing platform.
              </p>
              <p className="mt-2">
                Please read this Privacy Policy carefully. If you do not agree with the terms of this 
                Privacy Policy, please do not access SafeWorkPay.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Information We Collect</h2>
              <p>
                <strong>Personal Information:</strong> When you create an account, we collect your email 
                address, wallet address, and any profile information you choose to provide, such as your 
                name, professional information, and portfolio items.
              </p>
              <p className="mt-2">
                <strong>Usage Data:</strong> We collect information about how you interact with our platform, 
                including the jobs you post or bid on, transaction history, and platform usage patterns.
              </p>
              <p className="mt-2">
                <strong>Blockchain Data:</strong> When you interact with our smart contracts, certain 
                information is inherently made public on the blockchain, including your wallet address 
                and transaction details.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. How We Use Your Information</h2>
              <p>We use your information for various purposes, including:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Facilitating and processing transactions between freelancers and clients</li>
                <li>Providing, maintaining, and improving our services</li>
                <li>Communicating with you about your account, updates, and platform features</li>
                <li>Responding to your inquiries and providing customer support</li>
                <li>Detecting, preventing, and addressing technical issues or fraudulent activities</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Sharing Your Information</h2>
              <p>We may share your information in the following circumstances:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  <strong>With Users on the Platform:</strong> Your profile information and job-related details 
                  may be visible to other users as necessary for the platform's functionality.
                </li>
                <li>
                  <strong>Service Providers:</strong> We may share your information with third-party vendors 
                  who provide services on our behalf, such as hosting, analytics, and customer support.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose your information if required by law 
                  or in response to valid legal processes.
                </li>
                <li>
                  <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or asset 
                  sale, your information may be transferred as part of that transaction.
                </li>
              </ul>
              <p className="mt-2">
                <strong>Blockchain Transparency:</strong> Please note that due to the nature of blockchain 
                technology, transactions on the blockchain are public and cannot be deleted or altered.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information from 
                unauthorized access, alteration, disclosure, or destruction. However, no method of 
                transmission over the Internet or electronic storage is 100% secure, so we cannot 
                guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Your Rights</h2>
              <p>Depending on your location, you may have rights regarding your personal data, including:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Accessing, correcting, or deleting your personal information</li>
                <li>Withdrawing consent where processing is based on consent</li>
                <li>Data portability</li>
                <li>Objecting to or restricting processing in certain circumstances</li>
              </ul>
              <p className="mt-2">
                Please note that blockchain data cannot be altered or deleted due to the inherent 
                nature of the technology.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Children's Privacy</h2>
              <p>
                Our services are not intended for individuals under the age of 18. We do not knowingly 
                collect personal information from children under 18. If you become aware that a child 
                has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices 
                or for other operational, legal, or regulatory reasons. The updated version will be 
                indicated by an updated "Last updated" date, and the revised policy will be effective 
                immediately upon posting.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy or our data practices, 
                please contact us at:
              </p>
              <div className="mt-2">
                <p>Email: privacy@safeworkpay.com</p>
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

export default PrivacyPolicy;
