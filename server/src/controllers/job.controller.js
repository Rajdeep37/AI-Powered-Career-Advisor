import jobSearch from "../utils/jobSearch.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import courseSearch from "../utils/courseSearch.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

const getCourses = asyncHandler( async (req, res) => {
    const { s } = req.query;
    console.log(s)
    if(!s){
        throw new ApiError(400,"Query is required")
    }
    try {
        const courses = await courseSearch(s);
        const keysToKeep = ["pic", "title", "coupon", "org_price", "language", "rating","duration","platform","category"];
        //console.log(courses)
        const filteredCourses = courses.map((course) =>
            Object.fromEntries(
                Object.entries(course).filter(([key]) => keysToKeep.includes(key))
            )
        );
        //console.log(filteredCourses)
        return res
            .status(200)
            .json(new ApiResponse(200, { filteredCourses }, "Courses fetched!!"));
    } catch (error) {
        console.error(error)
    }
})

const getMatchedJobs = async (req, res) => {
    const user = req.user;

};

export { getJobs,getCourses, getMatchedJobs };
