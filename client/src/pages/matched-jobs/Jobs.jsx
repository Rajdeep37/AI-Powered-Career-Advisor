import { JobCard } from "@/components/JobCard";
import { api } from "@/utils/constants";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import useAuthStore from "@/zustand/authStore";
import { fetchJobsFromLinkedIn } from "@/actions/jobSearch";
import { Button } from "@/components/ui/button";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();
  const [searchBar, setSearchBar] = useState("");

  const fetchJobs = async () => {
    console.log("searchText: ",searchBar)
    try {
      const response = await api.get("jobs/getJobs", {
        params: { query: searchBar },
      });
      //setJobs(response.data)
      setJobs(response.data.data.filteredJobs);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchMatchJobs = async () => {
    const url = "http://127.0.0.1:5001/match_jobs";

    const userProfile = {
      education: user.education.degree,
      experience: "none",
      projects: user.projects.title,
      skills: user.skills,
      interests: user.interests,
    };

    try {
      const jobListings = await fetchJobsFromLinkedIn();

      const data = {
        user_profile: userProfile,
        job_listings: jobListings,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const matchedJobs = await response.json();
        console.log("Top matching jobs:");
        matchedJobs.forEach((job) => {
          console.log({
            title: job.title,
            companyUniversalName: job.companyUniversalName,
            formattedLocation: job.formattedLocation,
            formattedEmploymentStatus: job.formattedEmploymentStatus,
            formattedExperienceLevel: job.formattedExperienceLevel,
            companyApplyUrl: job.companyApplyUrl,
            jobPostingUrl: job.jobPostingUrl,
          });
        });

        setJobs(matchedJobs);
        setIsLoading(false);
        console.log(jobs);
      } else {
        const errorResponse = await response.json();
        throw new Error(
          `Error: ${response.status}, ${JSON.stringify(errorResponse)}`
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchMatchJobs();
    console.log(jobs);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-blue-400">Jobs</h1>
        </div>
      </header>
      {isLoading ? (
        <div className=" flex items-center justify-center py-28">
          <Loader />
        </div>
      ) : (
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for jobs..."
                className="w-full py-2 px-4 pl-10 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div>
                <input className="absolute left-3 top-2.5 text-gray-400" 
                  value={searchBar} 
                  onChange={(e) => setSearchBar(e.target.value)} 
                />
                <Button onClick={fetchJobs}>
                  Search
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, index) => (
              <JobCard key={index} {...job} />
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
