import { Router } from "express";
import {
  getJobs
} from "../controllers/job.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.route("/getJobs").get(getJobs);

//secured routes
//router.route("/verify").get(verifyJWT, authenticatedUser);


export default router;
