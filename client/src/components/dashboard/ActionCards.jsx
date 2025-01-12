import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, GraduationCap, Users } from "lucide-react";
import jobsImage from "../../../public/assets/jobs.jpeg";
import coursesImage from "../../../public/assets/courses.jpeg";
import resumeImage from "../../../public/assets/resume.jpeg"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


export function ActionCards() {
  const cards = [
    {
      title: "Find Jobs",
      description: "Explore opportunities matching your profile",
      icon: Briefcase,
      image: jobsImage,
    },
    {
      title: "Skill Development",
      description: "Enhance your professional toolkit",
      icon: GraduationCap,
      image: coursesImage,
    },
    {
      title: "Resume Analysis",
      description: "Upload your resume and get your profile reviewed!!",
      icon: Users,
      image: resumeImage,
      gradient: "from-emerald-500/10 to-emerald-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <Card
          key={index}
          className="group bg-gray-900/40 border-gray-800 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-300 text-white"
        >
          <CardContent className="p-6">
            <div
              className={`rounded-lg overflow-hidden mb-4 bg-gradient-to-br ${card.gradient}`}
            >
              <img
                src={card.image}
                alt={card.title}
                width={250}
                height={150}
                className="w-full h-[150px] object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <card.icon className="w-5 h-5" />
                <h3 className="font-semibold">{card.title}</h3>
              </div>
              <p className="text-sm text-gray-400">{card.description}</p>

              <Sheet>
                <SheetTrigger>
                  <Button
                    variant="ghost"
                    className="w-full group/button hover:bg-gray-800"
                  >
                    <span>View More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
