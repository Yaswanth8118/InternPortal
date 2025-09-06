const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Internship = sequelize.define('Internship', {
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
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'companies',
      key: 'id'
    }
  },
  type: {
    type: DataTypes.ENUM('Remote', 'On-site', 'Hybrid'),
    defaultValue: 'Remote'
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: true
  },
  stipend: {
    type: DataTypes.STRING,
    allowNull: true
  },
  stipendAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  slots: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  filledSlots: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('Open', 'Filled', 'Pending Review', 'Closed'),
    defaultValue: 'Open'
  },
  requirements: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  skills: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  applicationDeadline: {
    type: DataTypes.DATE,
    allowNull: true
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  postedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  applicationCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'internships',
  timestamps: true
});

module.exports = Internship;
