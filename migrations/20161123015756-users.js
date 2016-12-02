"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
 return queryInterface.createTable(
  'Users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.STRING
    },   
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    favartists1: {
      type: Sequelize.STRING 
    },
    favartists2: {
      type: Sequelize.STRING 
    },
    favartists3: {
      type: Sequelize.STRING 
    },
    favartists4: {
      type: Sequelize.STRING 
    },
    favartists5: {
      type: Sequelize.STRING 
    }
  });
},

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Users');
  }
};
