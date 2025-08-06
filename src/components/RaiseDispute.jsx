import { useState } from 'react'
import { FaTimes, FaExclamationTriangle, FaSpinner, FaGavel } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { raiseDispute } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'

const RaiseDispute = () => {
  const [raiseDisputeModal] = useGlobalState('raiseDisputeModal')
  const [job] = useGlobalState('job')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!job) return

    setLoading(true)
    await toast.promise(
      raiseDispute(job.id),
      {
        pending: 'Raising Dispute...',
        success: 'Dispute raised successfully, awaiting admin review 👌',
        error: 'Encountered error 🤯',
      }
    )
    setLoading(false)
    closeModal()
  }

  const closeModal = () => {
    setGlobalState('raiseDisputeModal', 'scale-0')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
      justify-center bg-black/50 backdrop-blur-sm z-50
      transition-transform duration-300 ${raiseDisputeModal}`}
      onClick={closeModal}
      aria-modal="true" 
      role="dialog"
      aria-labelledby="raise-dispute-title"
    >
      <div 
        className="bg-white/95 backdrop-blur-xl shadow-elevated rounded-2xl w-11/12 max-w-md overflow-hidden transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-100 bg-gradient-to-r from-orange-50 to-red-50 px-6 py-4 rounded-t-2xl relative">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/80 backdrop-blur-sm rounded-full text-orange-600 shadow-sm">
              <FaGavel className="text-xl" />
            </div>
            <h3 id="raise-dispute-title" className="font-semibold text-lg bg-gradient-to-r from-orange-600 to-red-600 text-transparent bg-clip-text">
              Raise a Dispute
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
          <form onSubmit={handleSubmit} className="flex flex-col">
            {job && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">
                  Job: <span className="text-gray-900 font-semibold">{job?.jobTitle}</span>
                </h4>
                
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-md mt-4">
                  <div className="flex gap-3">
                    <FaExclamationTriangle className="text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-orange-800 mb-1">Important Notice:</p>
                      <p className="text-sm text-orange-700">
                        This will lock the funds and notify the administrator to review the case. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6 mb-2">
                  <p className="text-gray-700">Are you sure you want to raise a dispute for this project?</p>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={closeModal}
                className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-all duration-200 flex items-center gap-2"
                disabled={loading}
                aria-label="Cancel dispute"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70"
                disabled={loading}
                aria-label="Confirm and raise dispute"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin text-sm" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <FaGavel className="text-sm" />
                    <span>Confirm & Raise Dispute</span>
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

export default RaiseDispute
