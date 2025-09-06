const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: 'postgres',
  logging: false // Set to console.log to see SQL queries
});

module.exports = sequelize;
