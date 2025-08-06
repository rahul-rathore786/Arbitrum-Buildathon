import React, { useEffect, useState } from "react";
import {
  FaTimes,
  FaPen,
  FaSpinner,
  FaTags,
  FaMoneyBillWave,
  FaFileAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateJob } from "../services/blockchain";
import { useGlobalState, setGlobalState } from "../store";

const UpdateJob = () => {
  const navigate = useNavigate();
  const [jobListing] = useGlobalState("jobListing");
  const [updateModal] = useGlobalState("updateModal");
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setJobTitle(jobListing?.jobTitle || "");
    setMinBudget(jobListing?.minBudget || "");
    setMaxBudget(jobListing?.maxBudget || "");
    setDescription(jobListing?.description || "");
    setSkills(jobListing?.tags || []);
  }, [jobListing]);

  const addSkills = (e) => {
    e?.preventDefault();
    if (skill.trim() === "") return;

    // Handle multiple comma-separated skills
    const skillsArray = skill
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    // Add non-duplicate skills
    const newSkills = [...skills];
    skillsArray.forEach((skillItem) => {
      if (!newSkills.includes(skillItem) && newSkills.length < 5) {
        newSkills.push(skillItem);
      }
    });

    setSkills(newSkills);
    setSkill("");
  };

  const removeSkill = (id) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i != id));
  };

  const closeModal = () => {
    setGlobalState("updateModal", "scale-0");
    setJobTitle("");
    setMinBudget("");
    setMaxBudget("");
    setDescription("");
    setGlobalState("jobListing", null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (jobTitle == "" || skills.length < 3 || description == "") return;

    setLoading(true);
    const params = {
      id: jobListing.id,
      jobTitle,
      description,
      tags: skills.slice(0, 5).join(","),
      minBudget,
      maxBudget,
    };

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await updateJob(params)
          .then(async () => {
            closeModal();
            setGlobalState("dataUpdate", (prev) => prev + 1);
            navigate("/myprojects");
            resolve();
          })
          .catch((error) => {
            console.error("Error updating job:", error);
            reject(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }),
      {
        pending: "Updating job listing...",
        success: "Job updated successfully 👌",
        error: "Update failed. Please try again 🤯",
      }
    );
  };

  const displaySkills = () => {
    if (skills.length > 0) {
      return skills.map((skill, i) => (
        <div
          className="px-3 py-1 bg-gradient-to-r from-primary-100 to-secondary-100 border border-primary-200 rounded-full text-primary-700 flex items-center"
          key={i}
        >
          <span className="text-sm font-medium">{skill}</span>
          <button
            type="button"
            onClick={() => removeSkill(i)}
            className="ml-2 text-xs text-red-500 hover:text-red-700 transition-colors"
          >
            <FaTimes />
          </button>
        </div>
      ));
    }
    return null;
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
      justify-center bg-black/50 backdrop-blur-sm z-50
      transition-transform duration-300 ${updateModal}`}
      onClick={closeModal}
      aria-modal="true"
      role="dialog"
      aria-labelledby="update-job-title"
    >
      <div
        className="bg-white/95 backdrop-blur-xl shadow-elevated rounded-2xl w-11/12 md:w-3/5 lg:w-2/5 max-h-[90vh] overflow-y-auto transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-100 bg-gradient-to-r from-primary-50 to-secondary-50 px-6 py-4 rounded-t-2xl sticky top-0 z-10 relative">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/80 backdrop-blur-sm rounded-full text-primary-600 shadow-sm">
              <FaPen className="text-xl" />
            </div>
            <h3
              id="update-job-title"
              className="font-semibold text-lg bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text"
            >
              Edit Job Listing
            </h3>
          </div>
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-1.5 text-gray-500 hover:text-primary-500 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* <div className="flex justify-center items-center rounded-xl mb-6">
              <div className="shrink-0 rounded-xl overflow-hidden h-24 w-24 shadow-md border border-gray-100">
                <img
                  alt="Job illustration"
                  className="h-full w-full object-cover"
                  src="https://media.istockphoto.com/id/1384549104/vector/website-under-construction-flat-design-modern-vector-illustration-concept.jpg?s=612x612&w=0&k=20&c=LY7InfPOsQaprKNKRvv6t12yqxDTyPcT1FQWsSU-jHA="
                />
              </div>
            </div> */}

            <div className="space-y-4">
              {/* Job Title */}
              <div className="space-y-2">
                <label
                  htmlFor="jobTitle"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <FaFileAlt className="text-primary-500" />
                  Job Title
                </label>
                <div className="relative">
                  <input
                    id="jobTitle"
                    className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all duration-200"
                    type="text"
                    name="title"
                    placeholder="Enter job title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Budget Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="minBudget"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  >
                    <FaMoneyBillWave className="text-green-500" />
                    Minimum Budget (ETH)
                  </label>
                  <div className="relative">
                    <input
                      id="minBudget"
                      className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all duration-200"
                      type="number"
                      min={0.01}
                      step={0.01}
                      name="minbudget"
                      placeholder="Min Budget (ETH)"
                      value={minBudget}
                      onChange={(e) => setMinBudget(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="maxBudget"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  >
                    <FaMoneyBillWave className="text-green-500" />
                    Maximum Budget (ETH)
                  </label>
                  <div className="relative">
                    <input
                      id="maxBudget"
                      className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all duration-200"
                      type="number"
                      min={1}
                      step={0.01}
                      name="maxbudget"
                      placeholder="Max Budget (ETH)"
                      value={maxBudget}
                      onChange={(e) => setMaxBudget(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <label
                  htmlFor="skills"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <FaTags className="text-blue-500" />
                  Required Skills
                </label>
                <div className="relative flex items-center gap-2">
                  <input
                    id="skills"
                    className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all duration-200"
                    name="skills"
                    placeholder="Skills needed (separated by comma)"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={addSkills}
                    className="whitespace-nowrap px-3 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200"
                    disabled={!skill.trim()}
                  >
                    Add
                  </button>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {displaySkills()}
                </div>
                {skills.length < 3 && (
                  <p className="text-xs text-orange-600 mt-1">
                    Please add at least 3 required skills
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <FaFileAlt className="text-primary-500" />
                  Job Description
                </label>
                <div className="relative">
                  <textarea
                    id="description"
                    className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all duration-200 resize-none"
                    rows={5}
                    name="description"
                    placeholder="Detailed job description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {description.length}/500 characters
                </p>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="py-2 px-6 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70"
                  disabled={
                    skills.length < 3 || !jobTitle || !description || loading
                  }
                  aria-label="Update job listing"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin text-sm" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <FaPen className="text-sm" />
                      <span>Update Job</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateJob;
