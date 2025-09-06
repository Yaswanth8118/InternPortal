const express = require('express');
const router = express.Router();
const { Project, Student, Course, Internship } = require('../models/index');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        { model: Student, as: 'student' },
        { model: Course, as: 'course' },
        { model: Internship, as: 'internship' }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
});

// Get projects by student ID
router.get('/student/:studentId', async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { studentId: req.params.studentId },
      include: [
        { model: Course, as: 'course' },
        { model: Internship, as: 'internship' }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    console.error('Error fetching student projects:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student projects',
      error: error.message
    });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [
        { model: Student, as: 'student' },
        { model: Course, as: 'course' },
        { model: Internship, as: 'internship' }
      ]
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
});

// Create new project
router.post('/', async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({
      success: true,
      data: project,
      message: 'Project created successfully'
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Project.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const updatedProject = await Project.findByPk(req.params.id, {
      include: [
        { model: Course, as: 'course' },
        { model: Internship, as: 'internship' }
      ]
    });

    res.json({
      success: true,
      data: updatedProject,
      message: 'Project updated successfully'
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Project.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
});

module.exports = router;
