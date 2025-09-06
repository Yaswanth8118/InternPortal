const express = require('express');
const router = express.Router();
const { Announcement, Course, Company } = require('../models/index');

// Get all announcements
router.get('/', async (req, res) => {
  try {
    const { targetAudience } = req.query;
    
    const whereClause = {
      isActive: true,
      publishDate: { [require('sequelize').Op.lte]: new Date() }
    };
    
    if (targetAudience) {
      whereClause.targetAudience = { [require('sequelize').Op.in]: [targetAudience, 'All'] };
    }
    
    const announcements = await Announcement.findAll({
      where: whereClause,
      include: [
        { model: Course, as: 'course' },
        { model: Company, as: 'company' }
      ],
      order: [
        ['priority', 'DESC'],
        ['publishDate', 'DESC']
      ]
    });

    res.json({
      success: true,
      data: announcements,
      count: announcements.length
    });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching announcements',
      error: error.message
    });
  }
});

// Get recent announcements for dashboard
router.get('/recent', async (req, res) => {
  try {
    const { targetAudience, limit = 5 } = req.query;
    
    const whereClause = {
      isActive: true,
      publishDate: { [require('sequelize').Op.lte]: new Date() }
    };
    
    if (targetAudience) {
      whereClause.targetAudience = { [require('sequelize').Op.in]: [targetAudience, 'All'] };
    }
    
    const announcements = await Announcement.findAll({
      where: whereClause,
      include: [
        { model: Course, as: 'course' },
        { model: Company, as: 'company' }
      ],
      order: [
        ['priority', 'DESC'],
        ['publishDate', 'DESC']
      ],
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      data: announcements,
      count: announcements.length
    });
  } catch (error) {
    console.error('Error fetching recent announcements:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent announcements',
      error: error.message
    });
  }
});

// Get announcement by ID
router.get('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findByPk(req.params.id, {
      include: [
        { model: Course, as: 'course' },
        { model: Company, as: 'company' }
      ]
    });

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    res.json({
      success: true,
      data: announcement
    });
  } catch (error) {
    console.error('Error fetching announcement:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching announcement',
      error: error.message
    });
  }
});

// Create new announcement
router.post('/', async (req, res) => {
  try {
    const announcement = await Announcement.create(req.body);
    res.status(201).json({
      success: true,
      data: announcement,
      message: 'Announcement created successfully'
    });
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating announcement',
      error: error.message
    });
  }
});

// Update announcement
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Announcement.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    const updatedAnnouncement = await Announcement.findByPk(req.params.id);
    res.json({
      success: true,
      data: updatedAnnouncement,
      message: 'Announcement updated successfully'
    });
  } catch (error) {
    console.error('Error updating announcement:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating announcement',
      error: error.message
    });
  }
});

// Delete announcement
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Announcement.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    res.json({
      success: true,
      message: 'Announcement deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting announcement',
      error: error.message
    });
  }
});

// Mark announcement as read by user
router.put('/:id/mark-read', async (req, res) => {
  try {
    const { userId } = req.body;
    
    const announcement = await Announcement.findByPk(req.params.id);
    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    // Add user to readBy array if not already present
    const readBy = announcement.readBy || [];
    if (!readBy.includes(userId)) {
      readBy.push(userId);
      
      await Announcement.update(
        { readBy },
        { where: { id: req.params.id } }
      );
    }

    res.json({
      success: true,
      message: 'Announcement marked as read'
    });
  } catch (error) {
    console.error('Error marking announcement as read:', error);
    res.status(400).json({
      success: false,
      message: 'Error marking announcement as read',
      error: error.message
    });
  }
});

module.exports = router;
