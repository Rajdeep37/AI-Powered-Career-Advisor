import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, MapPin } from 'lucide-react'

export function ProfileSection({ user }) {
  return (
    <Card className="group bg-gray-900/40 border-gray-800 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-300">
      <CardHeader className="p-4 border-b border-gray-800">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-white">
          <User className="w-4 h-4" />
          Personal details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-16 h-16 border-2 border-gray-800">
            <AvatarImage src={user.profilePicture} />
            <AvatarFallback>
              {user.name.firstName[0]}
              {user.name.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg text-white">
              {user.name.firstName} {user.name.lastName}
            </h3>
            <p className="text-sm text-gray-400">{user.experience[0]?.jobTitle}</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Mail className="w-4 h-4" />
            {user.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin className="w-4 h-4" />
            {user.jobPreferences.location}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

