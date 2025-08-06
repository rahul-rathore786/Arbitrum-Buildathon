import React, { useEffect } from "react";
import { Header, Hero, CreateJob, Footer } from "../components";
import { loadData } from "../services/blockchain";

const Home = () => {
  useEffect(() => {
    // Load job data on component mount
    loadData();

    // Set up polling interval
    const interval = setInterval(() => {
      loadData();
    }, 20000); // Poll every 20 seconds

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Hero />
        <CreateJob />
      </div>
    </div>
  );
};

export default Home;
