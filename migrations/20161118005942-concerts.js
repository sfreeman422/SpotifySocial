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
    artist_id: {
      type: Sequelize.INTERGER
    },  
    artist: Sequelize.STRING,
    eventName: Sequelize.STRING,
    venue: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
},

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('concerts');
  }
};
