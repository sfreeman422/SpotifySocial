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
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    },
    eventName: {
      type: Sequelize.STRING
    },
    artists: {
      type: Sequelize.STRING
    },
    venue: {
      type: Sequelize.STRING
    }
  })}

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
