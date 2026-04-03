import {
  createSession,
  markAttendance,
  getStudentAttendance,
} from "../services/attendanceService.js";



export const createSessionController = async (req, res) => {
  try {
    const { course_id, start_time, end_time, network_ssid } = req.body;

    const session = await createSession({
      course_id,
      created_by: req.user.id,
      start_time,
      end_time,
      network_ssid,
    });

    res.status(201).json(session);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




export const markAttendanceController = async (req, res) => {
  try {
    const { session_id } = req.body;

    const record = await markAttendance(session_id, req.user.id);

    res.status(201).json(record);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




export const getMyAttendanceController = async (req, res) => {
  try {
    const data = await getStudentAttendance(req.user.id);

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};