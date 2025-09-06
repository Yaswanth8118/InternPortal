const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'students',
      key: 'id'
    }
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'courses',
      key: 'id'
    }
  },
  internshipId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'internships',
      key: 'id'
    }
  },
  invoiceId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'INR'
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Paid', 'Failed', 'Cancelled', 'Refunded'),
    defaultValue: 'Pending'
  },
  paymentMethod: {
    type: DataTypes.ENUM('Credit Card', 'Debit Card', 'Net Banking', 'UPI', 'Wallet', 'Bank Transfer'),
    allowNull: true
  },
  paymentGateway: {
    type: DataTypes.STRING,
    allowNull: true
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  createdDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  paidAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  refundAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  refundDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  failureReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  receiptUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {}
  }
}, {
  tableName: 'payments',
  timestamps: true
});

module.exports = Payment;
