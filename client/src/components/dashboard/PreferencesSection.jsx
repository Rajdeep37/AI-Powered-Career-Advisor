import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings2, Building2, Clock } from 'lucide-react'

export function PreferencesSection({ user }) {
  return (
    <Card className="group bg-gray-900/40 border-gray-800 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-300 text-white">
      <CardHeader className="p-4 border-b border-gray-800">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Settings2 className="w-4 h-4" />
          Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{user.jobPreferences.jobType}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              <span className="text-sm">Industries</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.jobPreferences.industries.map((industry, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="border-gray-700 text-gray-400 hover:bg-gray-800"
                >
                  {industry}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

