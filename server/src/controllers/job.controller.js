import jobSearch from "../utils/jobSearch.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getJobs = async (req, res) => {
    const { query } = req.query;
    console.log(query)
    if(!query){
        throw new ApiError(400,"Query is required")
    }
    try {
        const jobs = await jobSearch(query);
        const keysToKeep = ["title", "companyUniversalName", "formattedEmploymentStatus", "formattedExperienceLevel", "companyApplyUrl", "jobPostingUrl","formattedLocation"];

        const filteredJobs = jobs.jobs.map((job) =>
            Object.fromEntries(
                Object.entries(job).filter(([key]) => keysToKeep.includes(key))
            )
        );
        //console.log(filteredJobs)
        return res
            .status(200)
            .json(new ApiResponse(200, { filteredJobs }, "Latest Jobs fetched!!"));
    } catch (error) {
        throw new ApiError(500, "Something Went Wrong");
    }
};
const getMatchedJobs = async (req, res) => {
    const user = req.user;

};

export { getJobs, getMatchedJobs };
