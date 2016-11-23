"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
 return queryInterface.createTable(
  'concerts',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.STRING
    },   
    name: Sequelize.STRING,
    birthdate: Sequelize.DATEONLY,
    images: Sequelize.STRING,
    email: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
},

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('concerts');
  }
};
