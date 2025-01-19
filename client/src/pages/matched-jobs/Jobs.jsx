import { JobCard } from '@/components/JobCard'
import { Search } from 'lucide-react'

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    postedDate: '2 days ago'
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'DataSystems',
    location: 'New York, NY',
    type: 'Full-time',
    postedDate: '1 week ago'
  },
  {
    id: 3,
    title: 'UX Designer',
    company: 'CreativeMinds',
    location: 'Los Angeles, CA',
    type: 'Contract',
    postedDate: '3 days ago'
  },
  {
    id: 4,
    title: 'DevOps Specialist',
    company: 'CloudNine',
    location: 'Remote',
    type: 'Full-time',
    postedDate: '5 days ago'
  },
  {
    id: 5,
    title: 'Data Scientist',
    company: 'AI Innovations',
    location: 'Boston, MA',
    type: 'Part-time',
    postedDate: '1 day ago'
  }
]

export default function Jobs() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-blue-400">Job Listings</h1>
        </div>
      </header>
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
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </main>
    </div>
  )
}

