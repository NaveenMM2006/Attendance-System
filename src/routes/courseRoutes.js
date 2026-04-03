import express from "express";

import {
    createCourseController,
    enrollStudentController,
    getMyCoursesController,
} from "../controllers/courseController.js";

import { authenticate, authorize } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post(
    "/create",
    authenticate,
    authorize("professor"),
    createCourseController
);

router.post(
    "/enroll",
    authenticate,
    authorize("student"),
    enrollStudentController
);

router.get(
    "/courses",
    authenticate,
    authorize("student"),
    getMyCoursesController
);

export default router;