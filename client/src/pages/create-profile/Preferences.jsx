import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PreferencesForm() {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">Job Preferences</CardTitle>
        <CardDescription className="text-gray-400">Set your job preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="location" className="text-white">Preferred Location</Label>
          <Input id="location" name="jobPreferences.location" className="bg-gray-800 text-white border-gray-700" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobType" className="text-white">Job Type</Label>
          <Select name="jobPreferences.jobType">
            <SelectTrigger id="jobType" className="bg-gray-800 text-white border-gray-700">
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-white">Salary Range</Label>
          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="salaryMin" className="text-white">Minimum</Label>
              <Input id="salaryMin" name="jobPreferences.salaryRange.min" type="number" className="bg-gray-800 text-white border-gray-700" />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="salaryMax" className="text-white">Maximum</Label>
              <Input id="salaryMax" name="jobPreferences.salaryRange.max" type="number" className="bg-gray-800 text-white border-gray-700" />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="industries" className="text-white">Preferred Industries (comma-separated)</Label>
          <Input id="industries" name="jobPreferences.industries" className="bg-gray-800 text-white border-gray-700" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="resumeUpload" className="text-white">Upload Resume</Label>
          <Input id="resumeUpload" name="resume.fileURL" type="file" accept=".pdf,.doc,.docx" className="bg-gray-800 text-white border-gray-700" />
        </div>
      </CardContent>
    </Card>
  )
}

