import { CalendarDays, MapPin, Briefcase } from 'lucide-react'


export function JobCard({ title, company, location, type, postedDate }) {
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-800 hover:border-gray-700">
      <h2 className="text-xl font-semibold mb-2 text-blue-400">{title}</h2>
      <p className="text-gray-400 mb-4">{company}</p>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-gray-500" />
          <span className="text-gray-300">{location}</span>
        </div>
        <div className="flex items-center">
          <Briefcase className="w-5 h-5 mr-2 text-gray-500" />
          <span className="text-gray-300">{type}</span>
        </div>
        <div className="flex items-center">
          <CalendarDays className="w-5 h-5 mr-2 text-gray-500" />
          <span className="text-gray-300">Posted {postedDate}</span>
        </div>
      </div>
    </div>
  )
}

