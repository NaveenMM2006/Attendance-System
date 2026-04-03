import express from "express";
import {
  createSessionController,
  markAttendanceController,
  getMyAttendanceController,
} from "../controllers/attendanceController.js";

import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();



router.post(
  "/create-session",
  authenticate,
  authorize("professor"),
  createSessionController
);



router.post(
  "/mark",
  authenticate,
  authorize("student"),
  markAttendanceController
);



router.get(
  "/my",
  authenticate,
  authorize("student"),
  getMyAttendanceController
);

export default router;