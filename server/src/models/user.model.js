import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    name: {
        firstName: String,
        lastName: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: String,
    education: [
        {
            institution: String,
            degree: String,
            fieldOfStudy: String,
            startYear: Number,
            endYear: Number,
            grade: String,
        }
    ],
    experience: [
        {
            jobTitle: String,
            company: String,
            location: String,
            startDate: Date,
            endDate: Date,
            description: String,
        }
    ],
    skills: [String],
    projects: [
        {
            title: String,
            description: String,
            technologies: [String],
            link: String,
        }
    ],
    interests: [String],
    resume: {
        fileURL: String,
        lastUpdated: Date,
    },
    jobPreferences: {
        location: String,
        jobType: String,  // e.g., Full-time, Part-time, Remote
        salaryRange: {
            min: Number,
            max: Number,
        },
        industries: [String],
    },
    profileSetup:{
        type: Boolean,
        default:false
    },
    refreshToken:{
        type:String,
    }
},
{
    timestamps:true
});


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})
userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            _id:this._id,
            email: this.email,
            username:this.username,
            fullName:this.fullName,
            
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User=new mongoose.model("User",userSchema);