import { useEffect, useState } from "react";
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
export function SkillsProjectsForm() {
  const [skills, setSkills] = useState([""]);
  const [interests, setInterests] = useState([""]);

  const addSkill = () => setSkills([...skills, ""]);
  const addInterest = () => setInterests([...interests, ""]);

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "",
      description: "",
      technologies: "",
      link: "",
    },
  ]);

  const handleChange = (id, key, value) => {
    setProjects((prevArray) =>
      prevArray.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };
  const addProject = () => {
    setProjects([
      ...projects,
      { id: projects.length + 1, title: "", description: "", technologies: "", link: "" },
    ]);
  };
  const handleSubmit = async () => {
    console.log(projects)
    const response = await api.post("/users/updateSkills", {
      skills,
      projects,
      interests,
    });
    console.log(response.data.data.user)
  };
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          Skills and Projects
        </CardTitle>
        <CardDescription className="text-gray-400">
          Add your skills, projects, and interests
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-white">Skills</Label>
          {skills.map((skill, index) => (
            <Input
              key={index}
              value={skill}
              onChange={(e) => {
                const newSkills = [...skills];
                newSkills[index] = e.target.value;
                setSkills(newSkills);
              }}
              name={`skills[${index}]`}
              placeholder="Enter a skill"
              className="bg-gray-800 text-white border-gray-700"
            />
          ))}
          <Button
            type="button"
            onClick={addSkill}
            className="bg-gray-800 text-white hover:bg-gray-700"
          >
            Add Another Skill
          </Button>
        </div>

        <div className="space-y-4">
          <Label className="text-white">Projects</Label>
          {projects.map((project) => (
            <div
              key={project.id}
              className="space-y-4 p-4 border border-gray-700 rounded"
            >
              <div className="space-y-2">
                <Label
                  htmlFor={`projectTitle-${project.id}`}
                  className="text-white"
                >
                  Project Title
                </Label>
                <Input
                  id={`projectTitle-${project.id}`}
                  name={`projects[${project.id}].title`}
                  required
                  className="bg-gray-800 text-white border-gray-700"
                  onChange={(e) =>
                    handleChange(project.id, "title", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor={`projectDescription-${project.id}`}
                  className="text-white"
                >
                  Description
                </Label>
                <Textarea
                  id={`projectDescription-${project.id}`}
                  name={`projects[${project.id}].description`}
                  required
                  className="bg-gray-800 text-white border-gray-700"
                  onChange={(e) =>
                    handleChange(project.id, "description", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor={`projectTechnologies-${project.id}`}
                  className="text-white"
                >
                  Technologies (comma-separated)
                </Label>
                <Input
                  id={`projectTechnologies-${project.id}`}
                  name={`projects[${project.id}].technologies`}
                  required
                  className="bg-gray-800 text-white border-gray-700"
                  onChange={(e) =>
                    handleChange(project.id, "technologies", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor={`projectLink-${project.id}`}
                  className="text-white"
                >
                  Project Link
                </Label>
                <Input
                  id={`projectLink-${project.id}`}
                  name={`projects[${project.id}].link`}
                  type="url"
                  className="bg-gray-800 text-white border-gray-700"
                  onChange={(e) => handleChange(project.id, "link", e.target.value)}
                />
              </div>
            </div>
          ))}
          <Button
            type="button"
            onClick={addProject}
            className="bg-gray-800 text-white hover:bg-gray-700"
          >
            Add Another Project
          </Button>
        </div>

        <div className="space-y-4">
          <Label className="text-white">Interests</Label>
          {interests.map((interest, index) => (
            <Input
              key={index}
              value={interest}
              onChange={(e) => {
                const newInterests = [...interests];
                newInterests[index] = e.target.value;
                setInterests(newInterests);
              }}
              name={`interests[${index}]`}
              placeholder="Enter an interest"
              className="bg-gray-800 text-white border-gray-700"
            />
          ))}
          <Button
            type="button"
            onClick={addInterest}
            className="bg-gray-800 text-white hover:bg-gray-700"
          >
            Add Another Interest
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
        </div>
      </CardContent>
    </Card>
  );
}
