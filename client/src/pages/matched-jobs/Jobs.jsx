import { JobCard } from '@/components/JobCard'
import { api } from '@/utils/constants'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
export default function Jobs() {
  const [jobs, setJobs] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const fetchJobs = async () => {
    try {
      const response = await api.get("jobs/getJobs", {
        params: { query: "Software Developer" }
      });
      //setJobs(response.data)
      setJobs(response.data.data.filteredJobs)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching jobs:", error)
    }
  }

  useEffect(() => {
    fetchJobs()
    console.log(jobs)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-blue-400">Jobs</h1>
        </div>
      </header>
      {isLoading ? (
        <div className=' flex items-center justify-center py-28'>
          <Loader />
        </div>
        
      ) : (
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for jobs..."
              className="w-full py-2 px-4 pl-10 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      </main>
    )}
    </div>
  )
}
