import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  BarChart2,
  BookOpen,
  BriefcaseIcon,
  CheckCircle,
  Lightbulb,
  Search,
  UserCircle,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 w-full h-16 flex items-center justify-between">
        <div className="flex items-center justify-center">
          <BriefcaseIcon className="h-6 w-6 mr-2" />
          <span className="font-bold">Career Advisor</span>
        </div>
        <div className="">
          <Button>Login</Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Navigate Your Career with Precision
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover personalized job recommendations and courses tailored
                  to your unique profile and interests.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Get Started</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Start your journey today.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              How It Works
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <UserCircle className="w-10 h-10 mb-2 text-primary" />
                  <CardTitle>Create Your Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Sign up and build your comprehensive career profile with
                    your skills, experiences, and interests.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart2 className="w-10 h-10 mb-2 text-primary" />
                  <CardTitle>AI Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Our advanced AI analyzes your profile to understand your
                    unique career potential and aspirations.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Lightbulb className="w-10 h-10 mb-2 text-primary" />
                  <CardTitle>Get Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Receive personalized job recommendations and course
                    suggestions to advance your career.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2">
              <div className="flex items-start space-x-4">
                <Search className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-bold">Smart Job Matching</h3>
                  <p>
                    Our AI matches you with the most relevant job openings based
                    on your unique profile.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <BookOpen className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-bold">Tailored Learning Paths</h3>
                  <p>
                    Discover courses and certifications that align with your
                    career goals and industry trends.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <BarChart2 className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-bold">Career Insights</h3>
                  <p>
                    Gain valuable insights into industry trends, salary
                    expectations, and skill demands.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-bold">Progress Tracking</h3>
                  <p>
                    Monitor your career growth and achievements with our
                    intuitive dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Accelerate Your Career?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of professionals who've found their dream
                  careers with Career Advisor.
                </p>
              </div>
              <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 CareerAdvisor. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
