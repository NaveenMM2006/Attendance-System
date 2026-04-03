import { query } from "../config/db.js";


export const createSession = async ({ course_id, created_by, start_time, end_time, network_ssid }) => {
  const result = await query(
    `INSERT INTO attendance_sessions (course_id, created_by, start_time, end_time, network_ssid)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [course_id, created_by, start_time, end_time, network_ssid]
  );

  return result.rows[0];
};



export const markAttendance = async (session_id, student_id) => {
  const result = await query(
    `INSERT INTO attendance_records (session_id, student_id)
     VALUES ($1, $2)
     RETURNING *`,
    [session_id, student_id]
  );

  return result.rows[0];
};



export const getStudentAttendance = async (student_id) => {
  const result = await query(
    `SELECT c.course_name, COUNT(ar.id) as attended
     FROM courses c
     JOIN enrollments e ON c.id = e.course_id
     LEFT JOIN attendance_sessions s ON s.course_id = c.id
     LEFT JOIN attendance_records ar 
       ON ar.session_id = s.id AND ar.student_id = e.student_id
     WHERE e.student_id = $1
     GROUP BY c.course_name`,
    [student_id]
  );

  return result.rows;
};