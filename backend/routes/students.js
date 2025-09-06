const express = require('express');
const router = express.Router();
const { Student, StudentCourse, Course, Project, Payment, Application } = require('../models/index');

// Get all students with their enrollments and statistics
router.get('/', async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [
        {
          model: StudentCourse,
          as: 'enrollments',
          include: [{ model: Course, as: 'course' }]
        },
        { model: Project, as: 'projects' },
        { model: Application, as: 'applications' },
        { model: Payment, as: 'payments' }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: students,
      count: students.length
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message
    });
  }
});

// Get student by ID with full details
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: [
        {
          model: StudentCourse,
          as: 'enrollments',
          include: [{ model: Course, as: 'course' }]
        },
        { model: Project, as: 'projects' },
        { model: Application, as: 'applications' },
        { model: Payment, as: 'payments' }
      ]
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student',
      error: error.message
    });
  }
});

// Create new student
router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({
      success: true,
      data: student,
      message: 'Student created successfully'
    });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating student',
      error: error.message
    });
  }
});

// Update student
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Student.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const updatedStudent = await Student.findByPk(req.params.id);
    res.json({
      success: true,
      data: updatedStudent,
      message: 'Student updated successfully'
    });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating student',
      error: error.message
    });
  }
});

// Delete student
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Student.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting student',
      error: error.message
    });
  }
});

// Get student dashboard data
router.get('/:id/dashboard', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: [
        {
          model: StudentCourse,
          as: 'enrollments',
          include: [{ model: Course, as: 'course' }],
          limit: 5,
          order: [['lastAccessedDate', 'DESC']]
        },
        {
          model: Project,
          as: 'projects',
          limit: 5,
          order: [['createdAt', 'DESC']]
        }
      ]
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Get upcoming deadlines
    const upcomingDeadlines = await Project.findAll({
      where: { 
        studentId: req.params.id,
        status: ['In Progress', 'Not Started']
      },
      order: [['dueDate', 'ASC']],
      limit: 5
    });

    res.json({
      success: true,
      data: {
        student,
        upcomingDeadlines,
        stats: {
          totalCourses: student.enrollments?.length || 0,
          totalProjects: student.projects?.length || 0,
          avgProgress: student.overallProgress
        }
      }
    });
  } catch (error) {
    console.error('Error fetching student dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student dashboard',
      error: error.message
    });
  }
});

// Get student statistics for admin dashboard
router.get('/stats/overview', async (req, res) => {
  try {
    const totalStudents = await Student.count();
    const activeStudents = await Student.count({ where: { status: 'Active' } });
    const completedStudents = await Student.count({ where: { status: 'Completed' } });
    const inactiveStudents = await Student.count({ where: { status: 'Inactive' } });
    const droppedStudents = await Student.count({ where: { status: 'Dropped Out' } });

    // Get average progress
    const students = await Student.findAll({ attributes: ['overallProgress'] });
    const avgProgress = students.reduce((sum, s) => sum + s.overallProgress, 0) / students.length || 0;

    res.json({
      success: true,
      data: {
        total: totalStudents,
        active: activeStudents,
        completed: completedStudents,
        inactive: inactiveStudents,
        droppedOut: droppedStudents,
        averageProgress: Math.round(avgProgress)
      }
    });
  } catch (error) {
    console.error('Error fetching student statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student statistics',
      error: error.message
    });
  }
});

module.exports = router;
