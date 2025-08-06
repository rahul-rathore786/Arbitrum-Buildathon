import React, { useEffect } from 'react'
import { Header, JobListingFreelancerActions } from '../components'
import { useGlobalState } from '../store'
import { getMyGigs } from '../services/blockchain'

const MyJobs = () => {
    const [mygigs] = useGlobalState('mygigs')

  useEffect(() => {
    getMyGigs()

    const interval = setInterval(() => {
      getMyGigs()
    }, 10000) // Poll every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="">
      <Header />
      <div className="mt-11 px-4">
        <h3 className="text-xl px-4 my-4">
          {mygigs.length > 0
            ? 'Assigned Tasks.'
            : "You Don't Have Any Assigned task."}
        </h3>
        <div className="px-3">
          {mygigs.map((mygig, i) => (
            <JobListingFreelancerActions key={i} jobListing={mygig} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyJobs
