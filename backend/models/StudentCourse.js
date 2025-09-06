const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StudentCourse = sequelize.define('StudentCourse', {
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
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id'
    }
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  status: {
    type: DataTypes.ENUM('Enrolled', 'In Progress', 'Completed', 'Dropped'),
    defaultValue: 'Enrolled'
  },
  enrollmentDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  completionDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: true
  },
  certificateIssued: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  lastAccessedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  timeSpent: {
    type: DataTypes.INTEGER, // in minutes
    defaultValue: 0
  }
}, {
  tableName: 'student_courses',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['studentId', 'courseId']
    }
  ]
});

module.exports = StudentCourse;
