import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function EducationForm() {
  const [educations, setEducations] = useState([{ id: 1 }])

  const addEducation = () => {
    setEducations([...educations, { id: educations.length + 1 }])
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">Education</CardTitle>
        <CardDescription className="text-gray-400">Add your educational background</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {educations.map((edu) => (
          <div key={edu.id} className="space-y-4 p-4 border border-gray-700 rounded">
            <div className="space-y-2">
              <Label htmlFor={`institution-${edu.id}`} className="text-white">Institution</Label>
              <Input id={`institution-${edu.id}`} name={`education[${edu.id}].institution`} required className="bg-gray-800 text-white border-gray-700" />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`degree-${edu.id}`} className="text-white">Degree</Label>
              <Input id={`degree-${edu.id}`} name={`education[${edu.id}].degree`} required className="bg-gray-800 text-white border-gray-700" />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`fieldOfStudy-${edu.id}`} className="text-white">Field of Study</Label>
              <Input id={`fieldOfStudy-${edu.id}`} name={`education[${edu.id}].fieldOfStudy`} required className="bg-gray-800 text-white border-gray-700" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`startYear-${edu.id}`} className="text-white">Start Year</Label>
                <Input id={`startYear-${edu.id}`} name={`education[${edu.id}].startYear`} type="number" required className="bg-gray-800 text-white border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`endYear-${edu.id}`} className="text-white">End Year</Label>
                <Input id={`endYear-${edu.id}`} name={`education[${edu.id}].endYear`} type="number" required className="bg-gray-800 text-white border-gray-700" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`grade-${edu.id}`} className="text-white">Grade</Label>
              <Input id={`grade-${edu.id}`} name={`education[${edu.id}].grade`} className="bg-gray-800 text-white border-gray-700" />
            </div>
          </div>
        ))}
        <Button type="button" onClick={addEducation} className="bg-gray-800 text-white hover:bg-gray-700">Add Another Education</Button>
      </CardContent>
    </Card>
  )
}

