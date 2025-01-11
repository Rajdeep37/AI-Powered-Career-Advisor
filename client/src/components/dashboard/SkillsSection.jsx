import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, GitBranch } from 'lucide-react'

export function SkillsSection({ user }) {
  return (
    <Card className="group bg-gray-900/40 border-gray-800 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-300 text-white">
      <CardHeader className="p-4 border-b border-gray-800">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Code2 className="w-4 h-4" />
          Skills & Projects
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Top Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-gray-800/50 hover:bg-gray-800 transition-colors text-white"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Recent Projects</h3>
            <div className="space-y-2">
              {user.projects.map((project, index) => (
                <div key={index} className="flex items-start gap-2">
                  <GitBranch className="w-4 h-4 mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">{project.title}</p>
                    <p className="text-xs text-gray-400">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

