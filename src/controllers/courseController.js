import { createCourse, enrollStudent, getStudentCourses } from "../services/courseService.js";


export const createCourseController = async (req, res) => {
    try {
        const {course_code, course_name} = req.body;

        const course = await createCourse({
            course_code,
            course_name,
            professor_id: req.user.id,
        });
        
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({
            error : error.message
        });
    }
};

export const enrollStudentController = async (req,res) => {
    try {
        const {student_id, course_id} = req.body;

        const result = await enrollStudent(student_id, course_id);

        res.status(201).json(result);

    } catch (error) {
        res.status(500).json({
            error : error.message
        });
    }
};

export const getMyCoursesController = async (req,res) => {
    try {
        const student_id = req.user.id;

        const courses = getStudentCourses(student_id);

        res.json(courses);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};