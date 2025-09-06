const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Application = sequelize.define('Application', {
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
  internshipId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'internships',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('Applied', 'Under Review', 'Interview Scheduled', 'Accepted', 'Rejected', 'Withdrawn'),
    defaultValue: 'Applied'
  },
  appliedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  resume: {
    type: DataTypes.STRING, // URL or file path
    allowNull: true
  },
  portfolio: {
    type: DataTypes.STRING, // URL
    allowNull: true
  },
  additionalDocuments: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  interviewDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  interviewNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 100
    }
  },
  reviewedBy: {
    type: DataTypes.STRING,
    allowNull: true
  },
  reviewedDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  rejectionReason: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'applications',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['studentId', 'internshipId']
    }
  ]
});

module.exports = Application;
