import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { placeholderUser } from '@/utils/placeholderData'

export function ProfileSummary({ user = placeholderUser }) {
  return (
    <Card className="bg-gray-900 border-gray-800 h-full">
      <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900">
        <CardTitle>Profile Summary</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <p className="text-gray-400">
            {user.name.firstName} {user.name.lastName} is a professional with experience in {user.experience[0]?.jobTitle || 'various roles'}.
          </p>
          <p className="text-gray-400">
            Key skills include: {user.skills.slice(0, 3).join(', ')}
          </p>
          <p className="text-gray-400">
            Looking for {user.jobPreferences.jobType} opportunities in {user.jobPreferences.location}.
          </p>
          <div className="pt-4">
            <Button className="w-full bg-blue-700 hover:bg-blue-600">Generate Full Summary</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

