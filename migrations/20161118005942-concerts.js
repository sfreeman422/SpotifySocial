"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
 return queryInterface.createTable(
  'Concerts',
  {
    user_id: {
      type: Sequelize.STRING,
      primaryKey: true
    }
    concert_id: {
      type: Sequelize.INTEGER
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
    venueAddress: Sequelize.STRING,
    //Needs to be a string, separated by commas. 
    artists: Sequelize.STRING,
    ticketURL: Sequelize.STRING,
    attendees: Sequelize.STRING
  });
},

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Concerts');
  }
};
