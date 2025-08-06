import React from "react";
import { Header } from "../components";

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Cookies Policy</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) 
                when you visit websites. They are widely used to make websites work more efficiently and 
                provide information to the website owners.
              </p>
              <p className="mt-2">
                At SafeWorkPay, we use cookies and similar technologies (like local storage) to enhance 
                your experience on our platform, understand user behavior, and improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800">Essential Cookies</h3>
                  <p>
                    These cookies are necessary for the website to function properly. They enable core 
                    functionality such as security, network management, and account access. You cannot 
                    opt out of these cookies as the website cannot function properly without them.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">Functional Cookies</h3>
                  <p>
                    These cookies allow us to remember choices you make and provide enhanced features. 
                    They may be set by us or by third-party providers whose services we have added to 
                    our pages. If you disable these cookies, some or all of these services may not 
                    function properly.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">Performance and Analytics Cookies</h3>
                  <p>
                    These cookies help us understand how visitors interact with our website by collecting 
                    and reporting information anonymously. They allow us to count visits, identify traffic 
                    sources, and see which parts of the site are most popular.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">Web3 and Blockchain Storage</h3>
                  <p>
                    As a blockchain application, we also utilize local storage to maintain connection to your 
                    crypto wallet and store non-sensitive application preferences. This information helps 
                    provide a seamless experience when interacting with the Hyperion blockchain.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. How We Use Cookies</h2>
              <p>We use cookies and similar technologies for several purposes, including:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  <strong>Authentication:</strong> To recognize you when you sign in using your blockchain wallet
                </li>
                <li>
                  <strong>Preferences:</strong> To remember information about your preferences and settings
                </li>
                <li>
                  <strong>Analytics:</strong> To understand how users navigate through our platform
                </li>
                <li>
                  <strong>Security:</strong> To help protect user accounts and prevent fraudulent activity
                </li>
                <li>
                  <strong>Blockchain Interactions:</strong> To store information related to your interactions 
                  with our smart contracts
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Third-Party Cookies</h2>
              <p>
                Some cookies are placed by third parties on our behalf. Third parties include analytics 
                providers, blockchain transaction monitoring services, and other service providers. These 
                third parties may receive information about your use of our website.
              </p>
              <p className="mt-2">
                We use services like Google Analytics to understand how users interact with our platform. 
                These services may use cookies and similar technologies to collect and analyze information 
                about your use of the website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Managing Cookies</h2>
              <p>
                Most web browsers allow you to manage your cookie preferences. You can set your browser to 
                refuse cookies, or to alert you when cookies are being sent. The methods for doing so vary 
                from browser to browser, and from version to version. 
              </p>
              <p className="mt-2">
                Please note that disabling cookies may impact your experience on SafeWorkPay, as some 
                features may not function properly without them, especially those related to wallet 
                connectivity and authentication.
              </p>
              <p className="mt-2">
                You can generally find information on how to manage cookie settings in the browser's 
                help documentation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Local Storage and Blockchain Data</h2>
              <p>
                In addition to cookies, our blockchain application uses browser local storage to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Remember your connected wallet address</li>
                <li>Cache certain blockchain data to improve performance</li>
                <li>Store UI preferences and settings</li>
              </ul>
              <p className="mt-2">
                Unlike cookies, local storage data remains until explicitly deleted by the user or the 
                application. You can clear local storage data through your browser settings, typically 
                under the privacy or storage sections.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices or for 
                other operational, legal, or regulatory reasons. The updated version will be indicated by an 
                updated "Last updated" date at the bottom of this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Contact Us</h2>
              <p>
                If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
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

export default CookiesPolicy;
