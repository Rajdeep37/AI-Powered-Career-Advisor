import { CourseCard } from '@/components/CourseCard'
import { Search } from 'lucide-react'
import { useState,useEffect } from 'react'
import { api } from '@/utils/constants'
import Loader from '@/components/Loader'
// const courses = [
//   {
//     id: 1,
//     title: 'Introduction to React',
//     instructor: 'Jane Doe',
//     duration: '10 hours',
//     level: 'Beginner',
//     students: 15000,
//     rating: 4.7
//   },
//   {
//     id: 2,
//     title: 'Advanced JavaScript Concepts',
//     instructor: 'John Smith',
//     duration: '15 hours',
//     level: 'Advanced',
//     students: 8000,
//     rating: 4.9
//   },
//   {
//     id: 3,
//     title: 'UI/UX Design Fundamentals',
//     instructor: 'Alice Johnson',
//     duration: '8 hours',
//     level: 'Intermediate',
//     students: 12000,
//     rating: 4.5
//   },
//   {
//     id: 4,
//     title: 'Python for Data Science',
//     instructor: 'Bob Williams',
//     duration: '20 hours',
//     level: 'Intermediate',
//     students: 18000,
//     rating: 4.8
//   },
//   {
//     id: 5,
//     title: 'Machine Learning Basics',
//     instructor: 'Eva Brown',
//     duration: '12 hours',
//     level: 'Beginner',
//     students: 10000,
//     rating: 4.6
//   }
// ]

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const fetchCourses = async () => {
    try {
      const response = await api.get("jobs/getCourses", {
        params: { s: "AI" }
      });
      //setJobs(response.data)
      setCourses(response.data.data.filteredCourses)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching jobs:", error)
    }
  }

  useEffect(() => {
    fetchCourses()
    console.log(courses)
  }, [])
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-blue-400">Courses</h1>
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
              placeholder="Search for courses..."
              className="w-full py-2 px-4 pl-10 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course,index) => (
            <CourseCard key={index} {...course}/>
          ))}
        </div>
      </main>
      )}
    </div>
  )
}

