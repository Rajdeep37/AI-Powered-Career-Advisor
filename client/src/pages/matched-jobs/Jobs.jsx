import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Star } from "lucide-react";

const userProfile = {
  name: "John Doe",
  desiredRole: "Frontend Developer",
  desiredLocation: "Remote",
  desiredSalary: 100000,
};

async function fetchMatchedJobs() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    { id: 1, title: "Senior Frontend Developer", company: "TechCorp", location: "Remote", salary: 110000, matchScore: 95 },
    { id: 2, title: "Frontend Engineer", company: "WebSolutions", location: "New York, NY (Remote OK)", salary: 105000, matchScore: 90 },
    { id: 3, title: "React Developer", company: "AppMakers", location: "Remote", salary: 95000, matchScore: 85 },
  ];
}

export default function MatchedJobsPage() {
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      const jobs = await fetchMatchedJobs();
      setMatchedJobs(jobs);
      setLoading(false);
    }
    loadJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Jobs Matched for {userProfile.name}
        </h1>
        <div className="mb-8 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Your Job Preferences</h2>
          <p>Desired Role: {userProfile.desiredRole}</p>
          <p>Desired Location: {userProfile.desiredLocation}</p>
          <p>Desired Salary: ${userProfile.desiredSalary.toLocaleString()}</p>
        </div>
        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <div className="space-y-6">
            {matchedJobs.map((job) => (
              <Card
                key={job.id}
                className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold text-white">
                        {job.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {job.company}
                      </CardDescription>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-purple-500 text-white"
                    >
                      {job.matchScore}% Match
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-sm text-gray-300">
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="mr-1 h-4 w-4" />
                      ${job.salary.toLocaleString()}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
                  >
                    <Star className="mr-2 h-4 w-4" />
                    Save Job
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600">
                    Apply Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
