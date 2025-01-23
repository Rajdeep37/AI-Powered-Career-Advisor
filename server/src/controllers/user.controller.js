import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { GoogleGenerativeAI } from "@google/generative-ai";
const generateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
  const { fName, lName, email, password } = req.body;

  if (!fName || !lName || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with email");
  }

  /*const avatarLocalFilePath=req.files?.avatar[0]?.path;
    let coverImageLocalFilePath;

    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalFilePath=req.files.coverImage[0].path
    }

    if(!avatarLocalFilePath){
        throw new ApiError(400,"Avatar is required")
    }
    console.log(req.files)
    const avatar= await uploadOnCloudinary(avatarLocalFilePath);
    const coverImage= await uploadOnCloudinary(coverImageLocalFilePath);
    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }
    */

  const user = await User.create({
    name: {
      firstName: fName,
      lastName: lName,
    },
    email,
    password,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registerd successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In successfully"
      )
    );
});

const authenticatedUser = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: req.user,
      },
      "User Details Fetched!!"
    )
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"));
});

const updatePersonal = asyncHandler(async (req, res) => {
  const { personal } = req.body;
  const user = req.user;
  if (personal) {
    user.name = personal;
  }

  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "Personal Details Updated"));
});

const updateEducation = asyncHandler(async (req, res) => {
  const { educations } = req.body;
  const user = req.user;
  if (educations) {
    user.education = educations;
  }

  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "Education Details Updated"));
});

const updateExperience = asyncHandler(async (req, res) => {
  const { experiences } = req.body;
  const user = req.user;
  if (experiences) {
    user.experience = experiences;
  }

  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "Experience Details Updated"));
});

const updateSkills = asyncHandler(async (req, res) => {
  const { skills, projects, interests } = req.body;
  const user = req.user;
  if (skills) {
    user.skills = skills;
  }
  if (projects) {
    user.projects = projects;
  }
  if (interests) {
    user.interests = interests;
  }
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "Skill Details Updated"));
});

const updatePreferences = asyncHandler(async (req, res) => {
  const { preferences } = req.body;
  const user = req.user;
  if (preferences) {
    user.jobPreferences = preferences;
  }

  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "Personal Details Updated"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(400, "Unauthorised request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (user?.refreshToken !== incomingRefreshToken) {
      throw new ApiError(400, "Refresh Token is expired or used");
    }

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access Token Refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(400, error?.message || "Something went wrong");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?.id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Incorrect Password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
});

const generateSummary = async (req, res) => {
  const user = req.user;
  const promptUser = {
    education: user.education,
    skills: user.skills,
    projects: user.projects,
    experience: user.experience,
    interests: user.interests,
  };
  console.log(promptUser);
  const prompt = `
Summarize this user profile in a clear, concise, and professional manner. The summary should be written as if the user is reading it about themselves. Use well-structured Markdown formatting with appropriate headings, subheadings, and spacing for readability. Highlight key achievements, skills, and current projects, while suggesting areas for improvement where applicable. Maintain a professional and engaging tone.
${JSON.stringify(promptUser)}

The output should include:

1. Personal Details: Briefly introduce the user's expertise and notable achievements.
2. Technical Skills: List the user's technical proficiencies.
3. Current Projects: Summarize the user's ongoing projects and goals.
4. Achievements: Highlight notable accomplishments such as awards and contributions.
5. Future Goals: Offer actionable suggestions or areas for growth.
6. Well-Formatted Markdown: Ensure proper use of headings, subheadings, bullet points, and spacing for clarity.

Return a structured markdown text that aligns with the above guidelines.`;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContentStream(prompt);
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const chunk of result.stream) {
      res.write(chunk.text());
    }
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating text");
  }
};
export {
  registerUser,
  loginUser,
  logoutUser,
  authenticatedUser,
  updatePreferences,
  updateSkills,
  updateExperience,
  updateEducation,
  updatePersonal,
  refreshAccessToken,
  generateSummary,
};
