import React from "react";
import { Header, CreateJob } from "../components";

const PostJob = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Post a New Job
        </h1>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-600 mb-6">
              Looking for talented freelancers? Post your job listing and get connected with
              skilled professionals ready to tackle your project. Our smart contract system
              ensures secure payment and project delivery.
            </p>
            <CreateJob />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
