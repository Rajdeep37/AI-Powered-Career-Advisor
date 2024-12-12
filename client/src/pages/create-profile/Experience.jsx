import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ExperienceForm() {
  const [experiences, setExperiences] = useState([{ id: 1 }])

  const addExperience = () => {
    setExperiences([...experiences, { id: experiences.length + 1 }])
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">Work Experience</CardTitle>
        <CardDescription className="text-gray-400">Add your work experiences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="space-y-4 p-4 border border-gray-700 rounded">
            <div className="space-y-2">
              <Label htmlFor={`jobTitle-${exp.id}`} className="text-white">Job Title</Label>
              <Input id={`jobTitle-${exp.id}`} name={`experience[${exp.id}].jobTitle`} required className="bg-gray-800 text-white border-gray-700" />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`company-${exp.id}`} className="text-white">Company</Label>
              <Input id={`company-${exp.id}`} name={`experience[${exp.id}].company`} required className="bg-gray-800 text-white border-gray-700" />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`location-${exp.id}`} className="text-white">Location</Label>
              <Input id={`location-${exp.id}`} name={`experience[${exp.id}].location`} required className="bg-gray-800 text-white border-gray-700" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`startDate-${exp.id}`} className="text-white">Start Date</Label>
                <Input id={`startDate-${exp.id}`} name={`experience[${exp.id}].startDate`} type="date" required className="bg-gray-800 text-white border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`endDate-${exp.id}`} className="text-white">End Date</Label>
                <Input id={`endDate-${exp.id}`} name={`experience[${exp.id}].endDate`} type="date" className="bg-gray-800 text-white border-gray-700" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`description-${exp.id}`} className="text-white">Description</Label>
              <Textarea id={`description-${exp.id}`} name={`experience[${exp.id}].description`} required className="bg-gray-800 text-white border-gray-700" />
            </div>
          </div>
        ))}
        <Button type="button" onClick={addExperience} className="bg-gray-800 text-white hover:bg-gray-700">Add Another Experience</Button>
      </CardContent>
    </Card>
  )
}

