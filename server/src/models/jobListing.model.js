const jobListingSchema = new mongoose.Schema({
    jobTitle: String,
    company: {
        name: String,
        website: String,
    },
    location: String,
    jobType: String,
    salaryRange: {
        min: Number,
        max: Number,
    },
    description: String,
    requirements: [String],
    postedDate: Date,
    applicationURL: String,
    source: String,
});

export const JobListing=new mongoose.model("JobListing",jobListingSchema);