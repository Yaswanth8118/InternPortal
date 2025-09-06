const express = require('express');
const router = express.Router();
const { Company, Internship, Application } = require('../models/index');

// Get all companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.findAll({
      include: [
        {
          model: Internship,
          as: 'internships',
          where: { isActive: true },
          required: false
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: companies,
      count: companies.length
    });
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching companies',
      error: error.message
    });
  }
});

// Get company by ID
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id, {
      include: [
        {
          model: Internship,
          as: 'internships',
          include: [
            {
              model: Application,
              as: 'applications'
            }
          ]
        }
      ]
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.json({
      success: true,
      data: company
    });
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching company',
      error: error.message
    });
  }
});

// Create new company
router.post('/', async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json({
      success: true,
      data: company,
      message: 'Company created successfully'
    });
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating company',
      error: error.message
    });
  }
});

// Update company
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Company.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    const updatedCompany = await Company.findByPk(req.params.id);
    res.json({
      success: true,
      data: updatedCompany,
      message: 'Company updated successfully'
    });
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating company',
      error: error.message
    });
  }
});

// Delete company
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Company.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.json({
      success: true,
      message: 'Company deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting company',
      error: error.message
    });
  }
});

// Get company statistics for admin dashboard
router.get('/stats/overview', async (req, res) => {
  try {
    const totalCompanies = await Company.count();
    const activeCompanies = await Company.count({ where: { status: 'Active' } });
    const inactiveCompanies = await Company.count({ where: { status: 'Inactive' } });
    const suspendedCompanies = await Company.count({ where: { status: 'Suspended' } });

    // Get total active internships from all companies
    const totalActiveInternships = await Internship.count({
      where: { isActive: true },
      include: [{
        model: Company,
        as: 'company',
        where: { status: 'Active' }
      }]
    });

    // Get total hired count
    const companies = await Company.findAll({ attributes: ['totalHired'] });
    const totalHired = companies.reduce((sum, c) => sum + c.totalHired, 0);

    // Get average rating
    const activeCompaniesWithRating = await Company.findAll({ 
      where: { status: 'Active' },
      attributes: ['rating'] 
    });
    const avgRating = activeCompaniesWithRating.reduce((sum, c) => sum + parseFloat(c.rating), 0) / activeCompaniesWithRating.length || 0;

    res.json({
      success: true,
      data: {
        total: totalCompanies,
        active: activeCompanies,
        inactive: inactiveCompanies,
        suspended: suspendedCompanies,
        totalActiveInternships,
        totalHired,
        averageRating: avgRating.toFixed(1)
      }
    });
  } catch (error) {
    console.error('Error fetching company statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching company statistics',
      error: error.message
    });
  }
});

// Get top performing companies
router.get('/top-performers', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    
    const topCompanies = await Company.findAll({
      where: { status: 'Active' },
      include: [
        {
          model: Internship,
          as: 'internships',
          where: { isActive: true },
          required: false
        }
      ],
      order: [
        ['rating', 'DESC'],
        ['totalHired', 'DESC']
      ],
      limit
    });

    res.json({
      success: true,
      data: topCompanies,
      count: topCompanies.length
    });
  } catch (error) {
    console.error('Error fetching top performing companies:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching top performing companies',
      error: error.message
    });
  }
});

// Get companies by industry
router.get('/by-industry', async (req, res) => {
  try {
    const { sequelize } = require('../models/index');
    
    const industryStats = await Company.findAll({
      attributes: [
        'industry',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { status: 'Active' },
      group: ['industry'],
      order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']]
    });

    res.json({
      success: true,
      data: industryStats
    });
  } catch (error) {
    console.error('Error fetching companies by industry:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching companies by industry',
      error: error.message
    });
  }
});

// Get companies by size
router.get('/by-size', async (req, res) => {
  try {
    const { sequelize } = require('../models/index');
    
    const sizeStats = await Company.findAll({
      attributes: [
        'size',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { status: 'Active' },
      group: ['size'],
      order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']]
    });

    res.json({
      success: true,
      data: sizeStats
    });
  } catch (error) {
    console.error('Error fetching companies by size:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching companies by size',
      error: error.message
    });
  }
});

module.exports = router;
