const express = require('express');
const router = express.Router();
const { Payment, Student, Course, Internship } = require('../models/index');

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [
        { model: Student, as: 'student' },
        { model: Course, as: 'course' },
        { model: Internship, as: 'internship' }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: payments,
      count: payments.length
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payments',
      error: error.message
    });
  }
});

// Get payments by student ID
router.get('/student/:studentId', async (req, res) => {
  try {
    const payments = await Payment.findAll({
      where: { studentId: req.params.studentId },
      include: [
        { model: Course, as: 'course' },
        { model: Internship, as: 'internship' }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: payments,
      count: payments.length
    });
  } catch (error) {
    console.error('Error fetching student payments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student payments',
      error: error.message
    });
  }
});

// Get payment by ID
router.get('/:id', async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id, {
      include: [
        { model: Student, as: 'student' },
        { model: Course, as: 'course' },
        { model: Internship, as: 'internship' }
      ]
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.json({
      success: true,
      data: payment
    });
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payment',
      error: error.message
    });
  }
});

// Create new payment
router.post('/', async (req, res) => {
  try {
    // Generate invoice ID if not provided
    if (!req.body.invoiceId) {
      req.body.invoiceId = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }

    const payment = await Payment.create(req.body);
    res.status(201).json({
      success: true,
      data: payment,
      message: 'Payment created successfully'
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating payment',
      error: error.message
    });
  }
});

// Update payment
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Payment.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    const updatedPayment = await Payment.findByPk(req.params.id, {
      include: [
        { model: Course, as: 'course' },
        { model: Internship, as: 'internship' }
      ]
    });

    res.json({
      success: true,
      data: updatedPayment,
      message: 'Payment updated successfully'
    });
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating payment',
      error: error.message
    });
  }
});

// Delete payment
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Payment.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.json({
      success: true,
      message: 'Payment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting payment',
      error: error.message
    });
  }
});

// Mark payment as paid
router.put('/:id/mark-paid', async (req, res) => {
  try {
    const { transactionId, paymentMethod, paymentGateway, paidAmount } = req.body;
    
    const [updated] = await Payment.update(
      { 
        status: 'Paid',
        paymentDate: new Date(),
        transactionId,
        paymentMethod,
        paymentGateway,
        paidAmount: paidAmount || null
      },
      { where: { id: req.params.id } }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    const updatedPayment = await Payment.findByPk(req.params.id);
    res.json({
      success: true,
      data: updatedPayment,
      message: 'Payment marked as paid successfully'
    });
  } catch (error) {
    console.error('Error marking payment as paid:', error);
    res.status(400).json({
      success: false,
      message: 'Error marking payment as paid',
      error: error.message
    });
  }
});

// Get payment statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const { sequelize } = require('../models/index');
    
    const totalPayments = await Payment.count();
    const paidPayments = await Payment.count({ where: { status: 'Paid' } });
    const pendingPayments = await Payment.count({ where: { status: 'Pending' } });
    const failedPayments = await Payment.count({ where: { status: 'Failed' } });
    
    // Get total revenue
    const totalRevenue = await Payment.sum('paidAmount', { where: { status: 'Paid' } }) || 0;
    
    // Get pending amount
    const pendingAmount = await Payment.sum('amount', { where: { status: 'Pending' } }) || 0;

    res.json({
      success: true,
      data: {
        total: totalPayments,
        paid: paidPayments,
        pending: pendingPayments,
        failed: failedPayments,
        totalRevenue: parseFloat(totalRevenue).toFixed(2),
        pendingAmount: parseFloat(pendingAmount).toFixed(2)
      }
    });
  } catch (error) {
    console.error('Error fetching payment statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payment statistics',
      error: error.message
    });
  }
});

module.exports = router;
