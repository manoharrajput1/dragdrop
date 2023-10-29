// Import Sequelize and the database connection
const { Sequelize } = require('sequelize');
const sequelize  = new Sequelize('list', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres', 
});

// Define the User model

module.exports = sequelize 