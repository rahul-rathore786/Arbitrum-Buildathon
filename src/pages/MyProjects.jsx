import React, { useEffect } from 'react'
import {
  DeleteJob,
  Header,
  JobListingOwnerActions,
  Payout,
  UpdateJob,
} from '../components'
import { useGlobalState } from '../store'
import { getMyJobs } from '../services/blockchain'

const MyProjects = () => {
  const [myjobs] = useGlobalState('myjobs')
  const [connectedAccount] = useGlobalState('connectedAccount')

  useEffect(() => {
    getMyJobs()

    const interval = setInterval(() => {
      getMyJobs()
    }, 10000) // Poll every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <Header />
      <div className="px-5 my-7">
        {myjobs.map((myjob, i) => (
          <JobListingOwnerActions
            key={i}
            jobListing={myjob}
            editable={myjob.owner == connectedAccount}
          />
        ))}

        {myjobs.length < 1 && (
          <h2 className="text-lg text-gray-500">No Posted Jobs Yet</h2>
        )}
        <UpdateJob />
        <DeleteJob />
        <Payout />
      </div>
    </div>
  )
}

export default MyProjects
