import { Clock, Users, BookOpen, Star } from 'lucide-react'



export function CourseCard({ title, instructor, duration, level, students, rating }) {
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-800 hover:border-gray-700">
      <h2 className="text-xl font-semibold mb-2 text-blue-400">{title}</h2>
      <p className="text-gray-400 mb-4">Instructor: {instructor}</p>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-2 text-gray-500" />
          <span className="text-gray-300">{duration}</span>
        </div>
        <div className="flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-gray-500" />
          <span className="text-gray-300">{level}</span>
        </div>
        <div className="flex items-center">
          <Users className="w-5 h-5 mr-2 text-gray-500" />
          <span className="text-gray-300">{students.toLocaleString()} students</span>
        </div>
        <div className="flex items-center">
          <Star className="w-5 h-5 mr-2 text-yellow-500" />
          <span className="text-gray-300">{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
}

