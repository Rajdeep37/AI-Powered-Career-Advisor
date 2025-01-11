import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users } from 'lucide-react'

export function NetworkingSection() {
  const events = [
    {
      title: "Tech Meetup 2025",
      date: "Jan 15, 2025",
      location: "San Francisco, CA",
      type: "In Person",
      attendees: 120,
    },
    {
      title: "Developer Conference",
      date: "Feb 1, 2025",
      location: "Virtual",
      type: "Online",
      attendees: 500,
    },
    {
      title: "AI & ML Workshop",
      date: "Feb 15, 2025",
      location: "New York, NY",
      type: "Hybrid",
      attendees: 250,
    },
  ]

  return (
    <Card className="bg-gray-900/40 border-gray-800 backdrop-blur-sm text-white">
      <CardHeader className="p-6 border-b border-gray-800">
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Networking Events
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
            >
              <h3 className="font-semibold mb-2">{event.title}</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {event.attendees} attendees
                </div>
              </div>
              <div className="mt-3">
                <Badge 
                  variant="secondary"
                  className="bg-gray-700/50"
                >
                  {event.type}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

