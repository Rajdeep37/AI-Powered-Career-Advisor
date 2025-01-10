import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/utils/constants";
export function ExperienceForm() {
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const addExperience = () => {
    setExperiences([...experiences, { id: experiences.length + 1 }]);
  };
  const handleChange = (id, key, value) => {
    setExperiences((prevArray) =>
      prevArray.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };

  const handleSubmit = async () => {
    const response = await api.post("/users/updateExperience", { experiences });
    console.log(response.data.data.user);
  };
  
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          Work Experience
        </CardTitle>
        <CardDescription className="text-gray-400">
          Add your work experiences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="space-y-4 p-4 border border-gray-700 rounded"
          >
            <div className="space-y-2">
              <Label htmlFor={`jobTitle-${exp.id}`} className="text-white">
                Job Title
              </Label>
              <Input
                id={`jobTitle-${exp.id}`}
                name={`experience[${exp.id}].jobTitle`}
                required
                className="bg-gray-800 text-white border-gray-700"
                onChange={(e) =>
                  handleChange(exp.id, "jobTitle", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`company-${exp.id}`} className="text-white">
                Company
              </Label>
              <Input
                id={`company-${exp.id}`}
                name={`experience[${exp.id}].company`}
                required
                className="bg-gray-800 text-white border-gray-700"
                onChange={(e) =>
                  handleChange(exp.id, "company", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`location-${exp.id}`} className="text-white">
                Location
              </Label>
              <Input
                id={`location-${exp.id}`}
                name={`experience[${exp.id}].location`}
                required
                className="bg-gray-800 text-white border-gray-700"
                onChange={(e) =>
                  handleChange(exp.id, "location", e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`startDate-${exp.id}`} className="text-white">
                  Start Date
                </Label>
                <Input
                  id={`startDate-${exp.id}`}
                  name={`experience[${exp.id}].startDate`}
                  type="date"
                  required
                  className="bg-gray-800 text-white border-gray-700"
                  onChange={(e) =>
                    handleChange(exp.id, "startDate", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`endDate-${exp.id}`} className="text-white">
                  End Date
                </Label>
                <Input
                  id={`endDate-${exp.id}`}
                  name={`experience[${exp.id}].endDate`}
                  type="date"
                  className="bg-gray-800 text-white border-gray-700"
                  onChange={(e) =>
                    handleChange(exp.id, "endDate", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`description-${exp.id}`} className="text-white">
                Description
              </Label>
              <Textarea
                id={`description-${exp.id}`}
                name={`experience[${exp.id}].description`}
                required
                className="bg-gray-800 text-white border-gray-700"
                onChange={(e) =>
                  handleChange(exp.id, "description", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          onClick={addExperience}
          className="bg-gray-800 text-white hover:bg-gray-700"
        >
          Add Another Experience
        </Button>
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
