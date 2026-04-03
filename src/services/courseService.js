import pool from "../config/db.js";


export const createCourse  = async ({course_code, course_name, professor_id }) => {
    const result = await pool.query (
        `INSERT INTO courses (course_code, course_name, professor_id) 
        VALUES ($1, $2, $3) RETURNING *`,
        [course_code, course_name, professor_id]
    );

    return result.rows[0];
};

export const enrollStudent = async (student_id, course_id) => {
    const result = await pool.query (
        `INSERT INTO enrollments (student_id, course_id)
        VALUES ($1, $2) RETURNING *`,
        [student_id,course_id]
    );

    return result.rows[0];
};


export const getStudentCourses = async (student_id) =>{
    const result = await pool.query(
        `SELECT c.* FROM courses c JOIN enrollments e ON c.id = e.course_id WHERE e.student_id = $1`,
        [student_id]
    );

    return result.rows;
}