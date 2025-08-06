import { useState } from 'react'
import { FaTimes, FaBalanceScale, FaSpinner, FaPercent, FaInfoCircle } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { resolveDispute } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'
import { useNavigate } from 'react-router-dom'

const ResolveDispute = () => {
  const [resolveDisputeModal] = useGlobalState('resolveDisputeModal')
  const [job] = useGlobalState('job')
  const [completionPct, setCompletionPct] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!job || !completionPct || completionPct < 0 || completionPct > 100) {
      toast.error('Please enter a valid percentage (0-100).')
      return
    }

    setLoading(true)
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await resolveDispute(job.id, completionPct)
          .then((tx) => {
            closeModal()
            setGlobalState('dataUpdate', (prev) => prev + 1)
            navigate('/disputed-projects')
            resolve(tx)
          })
          .catch((error) => reject(error))
      }),
      {
        pending: 'Resolving Dispute...',
        success: 'Dispute resolved and funds distributed successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
    setLoading(false)
  }

  const closeModal = () => {
    setGlobalState('resolveDisputeModal', 'scale-0')
    setCompletionPct('')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
      justify-center bg-black/50 backdrop-blur-sm z-50
      transition-transform duration-300 ${resolveDisputeModal}`}
      onClick={closeModal}
      aria-modal="true" 
      role="dialog"
      aria-labelledby="resolve-dispute-title"
    >
      <div 
        className="bg-white/95 backdrop-blur-xl shadow-elevated rounded-2xl w-11/12 max-w-md overflow-hidden transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-green-50 px-6 py-4 rounded-t-2xl relative">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/80 backdrop-blur-sm rounded-full text-blue-600 shadow-sm">
              <FaBalanceScale className="text-xl" />
            </div>
            <h3 id="resolve-dispute-title" className="font-semibold text-lg bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text">
              Resolve Dispute
            </h3>
          </div>
          <button 
            onClick={closeModal}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-1.5 text-gray-500 hover:text-blue-500 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col">
            {job && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-4">
                  Job: <span className="text-gray-900 font-semibold">{job?.jobTitle}</span>
                </h4>
              </div>
            )}
            
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <FaPercent className="text-blue-500" />
                <label htmlFor="completionPct" className="block text-sm font-medium text-gray-700">
                  Completion Percentage
                </label>
              </div>
              
              <div className="relative">
                <input
                  id="completionPct"
                  type="number"
                  className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
                  placeholder="e.g. 75"
                  min="0"
                  max="100"
                  value={completionPct}
                  onChange={(e) => setCompletionPct(e.target.value)}
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500">%</span>
                </div>
              </div>
              
              <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
                <div className="flex gap-3">
                  <FaInfoCircle className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-700">
                      The freelancer will receive this percentage of the total funds. The remaining funds will be returned to the client. Platform fees will be deducted from the total amount.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={closeModal}
                className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-all duration-200 flex items-center gap-2"
                disabled={loading}
                aria-label="Cancel resolution"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70"
                disabled={loading}
                aria-label="Resolve dispute and distribute funds"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin text-sm" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <FaBalanceScale className="text-sm" />
                    <span>Resolve & Distribute Funds</span>
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

export default ResolveDispute
