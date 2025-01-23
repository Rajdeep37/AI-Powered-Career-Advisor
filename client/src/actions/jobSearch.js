import axios from "axios";

export const fetchJobsFromLinkedIn = async () => {
  const options = {
    method: "GET",
    url: "https://linkedin-data-scraper.p.rapidapi.com/search_jobs",
    params: {
      query: "Software developer",
      page: "1",
      searchLocationId: "102713980",
      sortBy: "DD",
    },
    headers: {
      "x-rapidapi-key": "63b70525c5msha0d75333f2ba97cp10e7c5jsn70cffb609786",
      "x-rapidapi-host": "linkedin-data-scraper.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const jobs = response.data.response.jobs;

    // Prepare job listings with the required format
    const jobListings = jobs.slice(0, 20).map((job, index) => ({
      jobId: `${index + 1}`,
      title: job.title,
      description: job.jobDescription,
      companyUniversalName: job.companyUniversalName,
      formattedLocation: job.formattedLocation,
      formattedEmploymentStatus: job.formattedEmploymentStatus,
      formattedExperienceLevel: job.formattedExperienceLevel,
      companyApplyUrl: job.companyApplyUrl,
      jobPostingUrl: job.jobPostingUrl,
    }));

    return jobListings;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};
