const express = require('express');
const router = express.Router();
const { Internship, Company, Application, Student, Project } = require('../models/index');
const { Op } = require('sequelize');

// Get all internships with company details
router.get('/', async (req, res) => {
  try {
    const internships = await Internship.findAll({
      include: [
        { model: Company, as: 'company' },
        {
          model: Application,
          as: 'applications',
          include: [{ model: Student, as: 'student' }]
        }
      ],
      order: [['postedDate', 'DESC']]
    });

    res.json({
      success: true,
      data: internships,
      count: internships.length
    });
  } catch (error) {
    console.error('Error fetching internships:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching internships',
      error: error.message
    });
  }
});

// Get active internships (for students)
router.get('/active', async (req, res) => {
  try {
    const internships = await Internship.findAll({
      where: {
        isActive: true,
        status: { [Op.in]: ['Open', 'Pending Review'] },
        applicationDeadline: { [Op.gte]: new Date() }
      },
      include: [{ model: Company, as: 'company' }],
      order: [['applicationDeadline', 'ASC']]
    });

    res.json({
      success: true,
      data: internships,
      count: internships.length
    });
  } catch (error) {
    console.error('Error fetching active internships:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching active internships',
      error: error.message
    });
  }
});

// Get internship by ID
router.get('/:id', async (req, res) => {
  try {
    const internship = await Internship.findByPk(req.params.id, {
      include: [
        { model: Company, as: 'company' },
        {
          model: Application,
          as: 'applications',
          include: [{ model: Student, as: 'student' }]
        }
      ]
    });

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }

    res.json({
      success: true,
      data: internship
    });
  } catch (error) {
    console.error('Error fetching internship:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching internship',
      error: error.message
    });
  }
});

// Create new internship
router.post('/', async (req, res) => {
  try {
    const internship = await Internship.create(req.body);
    res.status(201).json({
      success: true,
      data: internship,
      message: 'Internship created successfully'
    });
  } catch (error) {
    console.error('Error creating internship:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating internship',
      error: error.message
    });
  }
});

// Update internship
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Internship.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }

    const updatedInternship = await Internship.findByPk(req.params.id, {
      include: [{ model: Company, as: 'company' }]
    });

    res.json({
      success: true,
      data: updatedInternship,
      message: 'Internship updated successfully'
    });
  } catch (error) {
    console.error('Error updating internship:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating internship',
      error: error.message
    });
  }
});

// Delete internship
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Internship.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }

    res.json({
      success: true,
      message: 'Internship deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting internship:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting internship',
      error: error.message
    });
  }
});

// Apply for internship
router.post('/:id/apply', async (req, res) => {
  try {
    const { studentId, coverLetter, resume, portfolio } = req.body;
    const internshipId = req.params.id;

    // Check if student already applied
    const existingApplication = await Application.findOne({
      where: { studentId, internshipId }
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'Student has already applied for this internship'
      });
    }

    // Check if internship is still open
    const internship = await Internship.findByPk(internshipId);
    if (!internship || internship.status !== 'Open') {
      return res.status(400).json({
        success: false,
        message: 'Internship is not available for applications'
      });
    }

    const application = await Application.create({
      studentId,
      internshipId,
      coverLetter,
      resume,
      portfolio,
      status: 'Applied'
    });

    // Update internship application count
    await Internship.update(
      { applicationCount: internship.applicationCount + 1 },
      { where: { id: internshipId } }
    );

    res.status(201).json({
      success: true,
      data: application,
      message: 'Application submitted successfully'
    });
  } catch (error) {
    console.error('Error applying for internship:', error);
    res.status(400).json({
      success: false,
      message: 'Error applying for internship',
      error: error.message
    });
  }
});

// Get applications for an internship
router.get('/:id/applications', async (req, res) => {
  try {
    const applications = await Application.findAll({
      where: { internshipId: req.params.id },
      include: [{ model: Student, as: 'student' }],
      order: [['appliedDate', 'DESC']]
    });

    res.json({
      success: true,
      data: applications,
      count: applications.length
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching applications',
      error: error.message
    });
  }
});

// Update application status
router.put('/applications/:applicationId', async (req, res) => {
  try {
    const { status, feedback, score, interviewDate, reviewedBy } = req.body;
    
    const [updated] = await Application.update(
      { 
        status, 
        feedback, 
        score, 
        interviewDate,
        reviewedBy,
        reviewedDate: new Date()
      },
      { where: { id: req.params.applicationId } }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    const updatedApplication = await Application.findByPk(req.params.applicationId, {
      include: [
        { model: Student, as: 'student' },
        { model: Internship, as: 'internship' }
      ]
    });

    // If status is 'Accepted', update internship filled slots
    if (status === 'Accepted') {
      const internship = updatedApplication.internship;
      await Internship.update(
        { filledSlots: internship.filledSlots + 1 },
        { where: { id: internship.id } }
      );

      // Check if all slots are filled
      if (internship.filledSlots + 1 >= internship.slots) {
        await Internship.update(
          { status: 'Filled' },
          { where: { id: internship.id } }
        );
      }
    }

    res.json({
      success: true,
      data: updatedApplication,
      message: 'Application status updated successfully'
    });
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating application',
      error: error.message
    });
  }
});

// Get internship statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const totalInternships = await Internship.count();
    const openInternships = await Internship.count({ where: { status: 'Open' } });
    const filledInternships = await Internship.count({ where: { status: 'Filled' } });
    const pendingInternships = await Internship.count({ where: { status: 'Pending Review' } });
    const closedInternships = await Internship.count({ where: { status: 'Closed' } });

    const totalApplications = await Application.count();
    const totalSlots = await Internship.sum('slots') || 0;
    const filledSlots = await Internship.sum('filledSlots') || 0;

    res.json({
      success: true,
      data: {
        total: totalInternships,
        open: openInternships,
        filled: filledInternships,
        pending: pendingInternships,
        closed: closedInternships,
        totalApplications,
        totalSlots,
        filledSlots,
        placementRate: totalSlots > 0 ? ((filledSlots / totalSlots) * 100).toFixed(1) : 0
      }
    });
  } catch (error) {
    console.error('Error fetching internship statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching internship statistics',
      error: error.message
    });
  }
});

module.exports = router;
