import React, { useState } from 'react'
import { setGlobalState, useGlobalState } from '../store'
import { FaTimes, FaCheckCircle, FaGithub, FaSpinner } from 'react-icons/fa'
import { completeJob } from '../services/blockchain'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CompleteJob = () => {
  const navigate = useNavigate()
  const [completeModal] = useGlobalState('completeModal')
  const [jobListing] = useGlobalState('jobListing')
  const [githubUrl, setGithubUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const closeModal = () => {
    setGlobalState('completeModal', 'scale-0')
    setGithubUrl('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!githubUrl) return
    
    setLoading(true)
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await completeJob(jobListing.id, githubUrl)
          .then(async (tx) => {
            closeModal()
            setGlobalState('dataUpdate', (prev) => prev + 1)
            navigate("/myjobs");
            resolve(tx)
          })
          .catch((err) => reject(err))
          .finally(() => {
            setLoading(false)
          })
      }),
      {
        pending: 'Submitting project...',
        success: 'Project submitted successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
      justify-center bg-black/50 backdrop-blur-sm z-50
      transition-transform duration-300 ${completeModal}`}
      onClick={closeModal}
      aria-modal="true" 
      role="dialog"
      aria-labelledby="complete-job-title"
    >
      <div 
        className="bg-white/95 backdrop-blur-xl shadow-elevated rounded-2xl w-11/12 md:w-3/5 lg:w-2/5 max-h-[90vh] overflow-y-auto transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/80 backdrop-blur-sm rounded-full text-green-600 shadow-sm">
              <FaCheckCircle className="text-xl" />
            </div>
            <h3 
              id="complete-job-title" 
              className="font-semibold text-lg bg-gradient-to-r from-green-600 to-primary-600 text-transparent bg-clip-text"
            >
              Complete Project
            </h3>
          </div>
          <button 
            onClick={closeModal}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-1.5 text-gray-500 hover:text-primary-500 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
          
          <div className="bg-gradient-to-r from-green-50 to-primary-50 rounded-xl p-4 mb-6 shadow-inner">
            <p className="text-gray-700">
              Submit your completed project by providing the GitHub repository URL. 
              This will mark the project as complete and notify the client for review.
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label 
                htmlFor="githubUrl" 
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <FaGithub className="text-gray-700" />
                GitHub Repository URL
              </label>
              <div className="relative">
                <input
                  id="githubUrl"
                  value={githubUrl}
                  placeholder="e.g. https://github.com/user/repo"
                  type="text"
                  className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all duration-200 shadow-sm"
                  onChange={(e) => setGithubUrl(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Please provide the full URL to your GitHub repository containing the completed project.
              </p>
            </div>
            
            <div>
              <button
                type="submit"
                className="py-2 px-6 bg-gradient-to-r from-green-500 to-primary-500 hover:from-green-600 hover:to-primary-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70"
                disabled={!githubUrl || loading}
                aria-label="Submit completed project"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin text-sm" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="text-sm" />
                    <span>Submit Project</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CompleteJob
