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
    eventName: Sequelize.STRING,
    eventDate: Sequelize.STRING,
    venueName: Sequelize.STRING,
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
