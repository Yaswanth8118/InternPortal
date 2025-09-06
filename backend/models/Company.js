const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: true
  },
  size: {
    type: DataTypes.ENUM('Small (10-50)', 'Medium (50-500)', 'Large (500+)', 'Enterprise (1000+)'),
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  contactPhone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    defaultValue: 0.0,
    validate: {
      min: 0.0,
      max: 5.0
    }
  },
  totalHired: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive', 'Suspended'),
    defaultValue: 'Active'
  },
  joinedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  headquarters: {
    type: DataTypes.STRING,
    allowNull: true
  },
  foundedYear: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'companies',
  timestamps: true
});

module.exports = Company;
