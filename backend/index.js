const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: 'postgres',
});

module.exports = sequelize;
