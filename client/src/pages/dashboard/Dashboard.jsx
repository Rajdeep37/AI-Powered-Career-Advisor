import { ProfileSection } from "@/components/dashboard/ProfileSection";
import { SkillsSection } from "@/components/dashboard/SkillsSection";
import { PreferencesSection } from "@/components/dashboard/PreferencesSection";
import { MarkdownSummary } from "@/components/dashboard/MarkdownSummary";
import { ActionCards } from "@/components/dashboard/ActionCards";
import { NetworkingSection } from "@/components/dashboard/NetworkingSection";
import useAuthStore from "@/zustand/authStore";
import { useEffect } from "react";
import { EducationSection } from "@/components/dashboard/EducationSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      <div className="max-w-[2000px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left sidebar */}
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

          {/* Main content */}
          <div className="w-full lg:w-3/4 space-y-6">
            <MarkdownSummary />
            <ActionCards />
            <NetworkingSection />
          </div>
        </div>
      </div>
    </div>
  );
}
