"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
 return queryInterface.createTable(
  'Concerts',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }, 
    eventName: {
      type: Sequelize.STRING
    },
    eventDate: {
      type: Sequelize.STRING
    }
    venueName: {
      type: Sequelize.STRING
    },
    //Needs to be a string, separated by commas. 
    venueAddress: {
      type: Sequelize.STRING
    },
    //Needs to be a string, separated by commas. 
    artists: {
      type: Sequelize.STRING
    },
    ticketURL: {
      type: Sequelize.STRING
    }
  });
},

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Concerts');
  }
};
