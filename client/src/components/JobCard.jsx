import { CalendarDays, MapPin, Briefcase } from 'lucide-react'
import { Button } from './ui/button'

export function JobCard({ title, companyUniversalName, formattedLocation, formattedEmploymentStatus, formattedExperienceLevel,companyApplyUrl,jobPostingUrl }) {
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-800 hover:border-gray-700">
      <h2 className="text-xl font-semibold mb-2 text-blue-400">{title}</h2>
      <p className="text-gray-400 mb-4">{companyUniversalName}</p>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-gray-500" />
          <span className="text-gray-300">{formattedLocation}</span>
        </div>
        <div className="flex items-center">
          <Briefcase className="w-5 h-5 mr-2 text-gray-500" />
          <span className="text-gray-300">{formattedEmploymentStatus}</span>
        </div>
        <div className="flex items-center">
          <CalendarDays className="w-5 h-5 mr-2 text-gray-500" />
          <span className="text-gray-300">Posted {formattedExperienceLevel}</span>
        </div>
      </div>
      <div className="bottom">
                <Button
                  type="button"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                  onClick={() => (window.location.href = {jobPostingUrl})}
                >
                  View
                </Button>
              </div>
    </div>
  )
}

