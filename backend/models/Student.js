const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  university: {
    type: DataTypes.STRING,
    allowNull: true
  },
  degree: {
    type: DataTypes.STRING,
    allowNull: true
  },
  graduationYear: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  skills: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive', 'Completed', 'Dropped Out'),
    defaultValue: 'Active'
  },
  overallProgress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  joinDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'students',
  timestamps: true
});

module.exports = Student;
