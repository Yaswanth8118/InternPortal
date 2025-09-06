const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
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
  goal: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  deliverables: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
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
    type: DataTypes.ENUM('Not Started', 'In Progress', 'Completed', 'On Hold', 'Cancelled'),
    defaultValue: 'Not Started'
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  completionDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  technologies: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  repositoryUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  demoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: true
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  attachments: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  }
}, {
  tableName: 'projects',
  timestamps: true
});

module.exports = Project;
