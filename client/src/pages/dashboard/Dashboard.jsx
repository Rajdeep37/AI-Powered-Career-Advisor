import { ProfileSection } from "@/components/dashboard/ProfileSection";
import { SkillsSection } from "@/components/dashboard/SkillsSection";
import { PreferencesSection } from "@/components/dashboard/PreferencesSection";
import { MarkdownSummary } from "@/components/dashboard/MarkdownSummary";
import { ActionCard } from "@/components/dashboard/ActionCards";
import { NetworkingSection } from "@/components/dashboard/NetworkingSection";
import useAuthStore from "@/zustand/authStore";
import { useEffect } from "react";
import { EducationSection } from "@/components/dashboard/EducationSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Briefcase } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { Users } from "lucide-react";

export default function Dashboard() {
  const { user, fetchUser } = useAuthStore();
  const navigate=useNavigate()
  const handleUpdate=()=>{
    navigate("/create-profile")
  }
  useEffect(() => {
    fetchUser;
    console.log(user);
  }, []);

  const cards = [
    {
      title: "Find Jobs",
      description: "Explore opportunities matching your profile",
      icon: Briefcase,
      image: "jobs",
      url:"/matched-jobs"
    },
    {
      title: "Skill Development",
      description: "Enhance your professional toolkit",
      icon: GraduationCap,
      image: "courses",
      url:"/matched-courses"
    },
    {
      title: "Resume Analysis",
      description: "Upload your resume and get your profile reviewed!!",
      icon: Users,
      image: "resume",
      url:"/resume"
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      <div className="max-w-[2000px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/4 space-y-6">
            <div className="sticky top-6 space-y-6">
              <ProfileSection user={user} />
              <EducationSection user={user} />
              <SkillsSection user={user} />
              <PreferencesSection user={user} />
              <div className="space-y-2">
                <Button
                  type="button"
                  onClick={handleUpdate}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                >
                  Update Profile
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/4 space-y-6">
            <MarkdownSummary />
            <ActionCard card={cards[0]} />
            <ActionCard card={cards[1]}/>
            <ActionCard card={cards[2]}/>
            <NetworkingSection />
          </div>
        </div>
      </div>
    </div>
  );
}
