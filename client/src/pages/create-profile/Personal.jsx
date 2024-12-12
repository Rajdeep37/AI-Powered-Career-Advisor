import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PersonalInfo() {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">Personal Information</CardTitle>
        <CardDescription className="text-gray-400">Provide your basic personal details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-white">First Name</Label>
            <Input id="firstName" name="firstName" required className="bg-gray-800 text-white border-gray-700" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-white">Last Name</Label>
            <Input id="lastName" name="lastName" required className="bg-gray-800 text-white border-gray-700" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input id="email" name="email" type="email" required className="bg-gray-800 text-white border-gray-700" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">Password</Label>
          <Input id="password" name="password" type="password" required className="bg-gray-800 text-white border-gray-700" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profilePicture" className="text-white">Profile Picture URL</Label>
          <Input id="profilePicture" name="profilePicture" type="url" className="bg-gray-800 text-white border-gray-700" />
        </div>
      </CardContent>
    </Card>
  )
}

