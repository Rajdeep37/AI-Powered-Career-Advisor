const jobListingSchema = new mongoose.Schema({
    jobTitle: String,
    company: {
        name: String,
        website: String,
    },
    location: String,
    jobType: String,  // e.g., Full-time, Part-time, Remote
    salaryRange: {
        min: Number,
        max: Number,
    },
    description: String,
    requirements: [String],
    postedDate: Date,
    applicationURL: String,
    source: String,  // e.g., LinkedIn, Indeed
});

export const JobListing=new mongoose.model("JobListing",jobListingSchema);