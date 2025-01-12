import { Router } from "express";
import {
  authenticatedUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updatePreferences,
  updateSkills,
  updateExperience,
  updateEducation,
  updatePersonal,
  generateSummary,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      profileImage: "avatar",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

//secured routes
router.route("/verify").get(verifyJWT, authenticatedUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/updatePersonal").post(verifyJWT, updatePersonal);
router.route("/updateEducation").post(verifyJWT, updateEducation);
router.route("/updateExperience").post(verifyJWT, updateExperience);
router.route("/updateSkills").post(verifyJWT, updateSkills);
router.route("/updatePreferences").post(verifyJWT, updatePreferences);
router.route("/generateSummary").post(verifyJWT,generateSummary)
router.route("/refresh-token").post(refreshAccessToken);

export default router;
