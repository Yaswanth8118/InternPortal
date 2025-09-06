const express = require('express');
const router = express.Router();
const { Course, StudentCourse, Student, Project, Payment } = require('../models/index');
const { Op } = require('sequelize');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [
        {
          model: StudentCourse,
          as: 'enrollments',
          include: [{ model: Student, as: 'student' }]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: courses,
      count: courses.length
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching courses',
      error: error.message
    });
  }
});

// Get available courses (not enrolled by specific student)
router.get('/available/:studentId', async (req, res) => {
  try {
    const enrolledCourseIds = await StudentCourse.findAll({
      where: { studentId: req.params.studentId },
      attributes: ['courseId']
    });

    const enrolledIds = enrolledCourseIds.map(ec => ec.courseId);

    const availableCourses = await Course.findAll({
      where: {
        id: { [Op.notIn]: enrolledIds },
        isActive: true
      },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: availableCourses,
      count: availableCourses.length
    });
  } catch (error) {
    console.error('Error fetching available courses:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching available courses',
      error: error.message
    });
  }
});

// Get enrolled courses for a student
router.get('/enrolled/:studentId', async (req, res) => {
  try {
    const enrollments = await StudentCourse.findAll({
      where: { studentId: req.params.studentId },
      include: [{ model: Course, as: 'course' }],
      order: [['enrollmentDate', 'DESC']]
    });

    res.json({
      success: true,
      data: enrollments,
      count: enrollments.length
    });
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching enrolled courses',
      error: error.message
    });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          model: StudentCourse,
          as: 'enrollments',
          include: [{ model: Student, as: 'student' }]
        },
        { model: Project, as: 'projects' }
      ]
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching course',
      error: error.message
    });
  }
});

// Create new course
router.post('/', async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      success: true,
      data: course,
      message: 'Course created successfully'
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating course',
      error: error.message
    });
  }
});

// Update course
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Course.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const updatedCourse = await Course.findByPk(req.params.id);
    res.json({
      success: true,
      data: updatedCourse,
      message: 'Course updated successfully'
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating course',
      error: error.message
    });
  }
});

// Delete course
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Course.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting course',
      error: error.message
    });
  }
});

// Enroll student in course
router.post('/enroll', async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    // Check if already enrolled
    const existingEnrollment = await StudentCourse.findOne({
      where: { studentId, courseId }
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Student is already enrolled in this course'
      });
    }

    const enrollment = await StudentCourse.create({
      studentId,
      courseId,
      status: 'Enrolled'
    });

    res.status(201).json({
      success: true,
      data: enrollment,
      message: 'Student enrolled successfully'
    });
  } catch (error) {
    console.error('Error enrolling student:', error);
    res.status(400).json({
      success: false,
      message: 'Error enrolling student',
      error: error.message
    });
  }
});

// Update course progress for a student
router.put('/progress/:studentId/:courseId', async (req, res) => {
  try {
    const { progress, status } = req.body;
    
    const [updated] = await StudentCourse.update(
      { progress, status, lastAccessedDate: new Date() },
      {
        where: {
          studentId: req.params.studentId,
          courseId: req.params.courseId
        }
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    const updatedEnrollment = await StudentCourse.findOne({
      where: {
        studentId: req.params.studentId,
        courseId: req.params.courseId
      },
      include: [{ model: Course, as: 'course' }]
    });

    res.json({
      success: true,
      data: updatedEnrollment,
      message: 'Course progress updated successfully'
    });
  } catch (error) {
    console.error('Error updating course progress:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating course progress',
      error: error.message
    });
  }
});

module.exports = router;
