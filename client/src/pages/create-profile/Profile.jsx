import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalInfo } from "./Personal";
import { EducationForm } from "./Education";
import { ExperienceForm } from "./Experience";
import { SkillsProjectsForm } from "./Skills";
import { PreferencesForm } from "./Preferences";
import { useNavigate } from "react-router-dom";

export default function CreateProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [doneClick,setDoneClick] = useState(false)
  const navigate=useNavigate()
  useEffect(()=>{
    if(activeTab==="preferences"){
      navigate("/dashboard")
    }
    setDoneClick(false)
  },[doneClick])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Create Your Profile
        </h1>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-8"
          >
            <TabsList className="grid w-full grid-cols-5 bg-gray-800 rounded-lg p-1">
              <TabsTrigger
                value="personal"
                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-md transition-all"
              >
                Personal
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-md transition-all"
              >
                Education
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-md transition-all"
              >
                Experience
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-md transition-all"
              >
                Skills & Projects
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-md transition-all"
              >
                Preferences
              </TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="space-y-4">
              <PersonalInfo />
            </TabsContent>
            <TabsContent value="education" className="space-y-4">
              <EducationForm />
            </TabsContent>
            <TabsContent value="experience" className="space-y-4">
              <ExperienceForm />
            </TabsContent>
            <TabsContent value="skills" className="space-y-4">
              <SkillsProjectsForm />
            </TabsContent>
            <TabsContent value="preferences" className="space-y-4">
              <PreferencesForm />
            </TabsContent>
          </Tabs>
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const tabs = [
                  "personal",
                  "education",
                  "experience",
                  "skills",
                  "preferences",
                ];
                const currentIndex = tabs.indexOf(activeTab);
                if (currentIndex > 0) {
                  setActiveTab(tabs[currentIndex - 1]);
                }
              }}
              className="bg-gray-800 text-white hover:bg-gray-700"
            >
              Previous
            </Button>
            <Button
              type="button"
              onClick={() => {
                setDoneClick(true)
                const tabs = [
                  "personal",
                  "education",
                  "experience",
                  "skills",
                  "preferences",
                ];
                
                const currentIndex = tabs.indexOf(activeTab);
                if (currentIndex < tabs.length - 1) {
                  setActiveTab(tabs[currentIndex + 1]);
                } 
                
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
            >
              {activeTab === "preferences" ? "Done" : "Next"}
            </Button>
          </div>
      </div>
    </div>
  );
}
