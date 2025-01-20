import { Router } from "express";
import {
  getCourses,
  getJobs
} from "../controllers/job.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.route("/getJobs").get(getJobs);
router.route("/getCourses").get(getCourses)
//secured routes
//router.route("/verify").get(verifyJWT, authenticatedUser);


export default router;
