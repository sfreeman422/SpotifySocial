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
    userPic: {
      type: Sequelize.STRING
    },
    favArtists1: {
      type: Sequelize.STRING
    },
    favArtists2: {
      type: Sequelize.STRING
    },
    favArtists3: {
      type: Sequelize.STRING
    },
    favArtists4: {
      type: Sequelize.STRING
    },
    favArtists5: {
      type: Sequelize.STRING
    },
    favArtists6: {
      type: Sequelize.STRING
    },
    favArtists7: {
      type: Sequelize.STRING
    },
    favArtists8: {
      type: Sequelize.STRING
    },
    favArtists9: {
      type: Sequelize.STRING
    },
    favArtists10: {
      type: Sequelize.STRING
    },
    favArtists11: {
      type: Sequelize.STRING
    },
    favArtists12: {
      type: Sequelize.STRING
    },
    favArtists13: {
      type: Sequelize.STRING
    },
    favArtists14: {
      type: Sequelize.STRING
    },
    favArtists15: {
      type: Sequelize.STRING
    },
    favArtists16: {
      type: Sequelize.STRING
    },
    favArtists17: {
      type: Sequelize.STRING
    },
    favArtists18: {
      type: Sequelize.STRING
    },
    favArtists19: {
      type: Sequelize.STRING
    },
    favArtists20: {
      type: Sequelize.STRING
    }
  });
},

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Users');
  }
};
