import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { University, School } from "lucide-react";

export function EducationSection({ user }) {
  return (
    <Card className="group bg-gray-900/40 border-gray-800 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-300 text-white">
      <CardHeader className="p-4 border-b border-gray-800">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <University className="w-4 h-4" />
          Education Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <div className="space-y-2">
              {user.education.map((edu,index) => (
                <div>
                  <div key={index} className="flex items-start gap-2">
                    <School className="w-4 h-4 mt-1 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">{edu.institution}</p>
                      <p className="text-xs text-gray-400">
                        {edu.degree}
                      </p>
                      <p className="text-xs text-gray-400">
                        {edu.fieldOfStudy}
                      </p>
                      <p className="text-xs text-gray-400">
                        {edu.startYear}-{edu.endYear}
                      </p>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
