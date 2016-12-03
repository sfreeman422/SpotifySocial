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
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    // userPic: Sequelize.STRING,
    favArtists1: Sequelize.STRING,
    favArtists2: Sequelize.STRING,
    favArtists3: Sequelize.STRING,
    favArtists4: Sequelize.STRING,
    favArtists5: Sequelize.STRING,
    favArtists6: Sequelize.STRING,
    favArtists7: Sequelize.STRING,
    favArtists8: Sequelize.STRING,
    favArtists9: Sequelize.STRING,
    favArtists10: Sequelize.STRING,
    favArtists11: Sequelize.STRING,
    favArtists12: Sequelize.STRING,
    favArtists13: Sequelize.STRING,
    favArtists14: Sequelize.STRING,
    favArtists15: Sequelize.STRING,
    favArtists16: Sequelize.STRING,
    favArtists17: Sequelize.STRING,
    favArtists18: Sequelize.STRING,
    favArtists19: Sequelize.STRING,
    favArtists20: Sequelize.STRING
  });
},

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Users');
  }
};
