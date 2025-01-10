import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/utils/constants";
import { useState } from "react";

export function PreferencesForm() {
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [minSal, setMinSal] = useState("");
  const [maxSal, setMaxSal] = useState("");
  const [industries, setIndustries] = useState("");

  const handleSubmit = async () => {
    const preferences = {
      location,
      jobType,
      salaryRange: {
        min: minSal,
        max: maxSal,
      },
      industries,
    };
    const response = await api.post("/users/updatePreferences", { preferences });
    console.log(response.data.data.user);
  };
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          Job Preferences
        </CardTitle>
        <CardDescription className="text-gray-400">
          Set your job preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="location" className="text-white">
            Preferred Location
          </Label>
          <Input
            id="location"
            name="jobPreferences.location"
            className="bg-gray-800 text-white border-gray-700"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobType" className="text-white">
            Job Type
          </Label>
          <Select name="jobPreferences.jobType">
            <SelectTrigger
              id="jobType"
              className="bg-gray-800 text-white border-gray-700"
            >
              <SelectValue
                placeholder="Select job type"
                onChange={(e) => setJobType(e.target.value)}
              />
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
              <Label htmlFor="salaryMin" className="text-white">
                Minimum
              </Label>
              <Input
                id="salaryMin"
                name="jobPreferences.salaryRange.min"
                type="number"
                className="bg-gray-800 text-white border-gray-700"
                onChange={(e) => setMinSal(e.target.value)}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="salaryMax" className="text-white">
                Maximum
              </Label>
              <Input
                id="salaryMax"
                name="jobPreferences.salaryRange.max"
                type="number"
                className="bg-gray-800 text-white border-gray-700"
                onChange={(e) => setMaxSal(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="industries" className="text-white">
            Preferred Industries (comma-separated)
          </Label>
          <Input
            id="industries"
            name="jobPreferences.industries"
            className="bg-gray-800 text-white border-gray-700"
            onChange={(e) => setIndustries(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="resumeUpload" className="text-white">
            Upload Resume
          </Label>
          <Input
            id="resumeUpload"
            name="resume.fileURL"
            type="file"
            accept=".pdf,.doc,.docx"
            className="bg-gray-800 text-white border-gray-700"
          />
        </div>
        <div className="space-y-2">
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
          >
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
