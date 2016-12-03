"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
 return queryInterface.createTable(
  'Users',
  {
    user_id: {
      type: Sequelize.STRING,
      primaryKey: true
    },   
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    // userPic: Sequelize.STRING,
    favArtists1: Sequelize.STRING,
    favArtists2: Sequelize.STRING,
    favArtists3: Sequelize.STRING,
    favArtists4: Sequelize.STRING,
    favArtists5: Sequelize.STRING
  });
},

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Users');
  }
};
