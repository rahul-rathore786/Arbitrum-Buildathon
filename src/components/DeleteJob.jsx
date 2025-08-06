import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaTrashAlt, FaExclamationTriangle, FaTimes, FaSpinner } from 'react-icons/fa'
import { deleteJob } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'

const DeleteJob = () => {
  const navigate = useNavigate()
  const [deleteModal] = useGlobalState('deleteModal')
  const [jobListing] = useGlobalState('jobListing')
  const [isDeleting, setIsDeleting] = useState(false)

  const closeModal = () => {
    setGlobalState('deleteModal', 'scale-0')
    setGlobalState('jobListing', null)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await deleteJob(jobListing.id)
          .then(async () => {
            closeModal()
            setGlobalState('dataUpdate', (prev) => prev + 1)
            navigate('/myprojects')
            resolve()
          })
          .catch((error) => {
            console.error('Error deleting job:', error)
            reject(error)
          })
      }),
      {
        pending: 'Deleting job...',
        success: 'Job deleted successfully 👌',
        error: 'Failed to delete job 🤯',
      }
    )
    setIsDeleting(false)
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
      bg-black/50 backdrop-blur-sm z-50 transition-transform duration-300 ${deleteModal}`}
      onClick={closeModal}
      aria-modal="true" 
      role="dialog"
      aria-labelledby="delete-job-title"
    >
      <div 
        className="bg-white/95 backdrop-blur-xl shadow-elevated rounded-2xl w-11/12 max-w-md overflow-hidden transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-100 bg-gradient-to-r from-red-50 to-red-100 px-6 py-4 rounded-t-2xl relative">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/80 backdrop-blur-sm rounded-full text-red-500 shadow-sm">
              <FaExclamationTriangle className="text-xl" />
            </div>
            <h3 id="delete-job-title" className="font-semibold text-lg text-red-700">
              Confirm Deletion
            </h3>
          </div>
          <button 
            onClick={closeModal}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-1.5 text-gray-500 hover:text-red-500 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h4 className="font-medium text-gray-800 mb-4">
              Are you sure you want to delete this job?
            </h4>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <p className="text-sm text-red-700">
                This action cannot be undone. The job listing will be permanently removed from the blockchain.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={closeModal}
              className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-all duration-200 flex items-center gap-2"
              disabled={isDeleting}
              aria-label="Cancel deletion"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="py-2 px-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70"
              disabled={isDeleting}
              aria-label="Delete job permanently"
            >
              {isDeleting ? (
                <>
                  <FaSpinner className="animate-spin text-sm" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <FaTrashAlt className="text-sm" />
                  <span>Delete Permanently</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteJob
