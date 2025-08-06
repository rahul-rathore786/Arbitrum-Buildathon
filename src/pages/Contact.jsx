import React, { useState } from "react";
import { Header } from "../components";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
            Contact Us
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-70"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Company Info */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-3 rounded-full mr-4">
                      <FaMapMarkerAlt className="text-primary-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Our Office</h3>
                      <address className="not-italic text-gray-600">
                        123 Blockchain Avenue<br />
                        Silicon Valley, CA 94025<br />
                        United States
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary-100 p-3 rounded-full mr-4">
                      <FaPhoneAlt className="text-primary-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Phone</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary-100 p-3 rounded-full mr-4">
                      <FaEnvelope className="text-primary-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Email</h3>
                      <p className="text-gray-600">
                        <a 
                          href="mailto:support@safeworkpay.com" 
                          className="hover:text-primary-600 transition-colors"
                        >
                          support@safeworkpay.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary-100 p-3 rounded-full mr-4">
                      <FaClock className="text-primary-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 5:00 PM PST<br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
                <h3 className="font-semibold text-gray-800 mb-2">Community Support</h3>
                <p className="text-gray-600 mb-4">
                  Join our Discord community for faster response and to connect with other users.
                </p>
                <a 
                  href="https://discord.com/safeworkpay" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                >
                  Join Our Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
