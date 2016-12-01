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
    artist: {
      type: Sequelize.STRING
    },
    eventName: {
      type: Sequelize.STRING
    },
    venue: {
      type: Sequelize.STRING
    }
  });
},

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('concerts');
  }
};
