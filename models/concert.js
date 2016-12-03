"use strict";

module.exports = function(sequelize, DataTypes) {
	var Concerts = sequelize.define("Concerts", {
		concert_id: DataTypes.INTEGER,
		eventDate: DataTypes.DATE,q
		venueName: DataTypes.STRING,
		venueAddress: DataTypes.STRING,
		artists: DataTypes.STRING,
		ticketURL: DataTypes.STRING
	}, {

		// underscored: true,

		// freezeTableName: true,

		// tableName: 'Concerts',

		// classMethods: {
		// 	associate: function(models) {
		// 		Concerts.belongsTo(models.Users, {
		// 			onDelete: "CASCADE",
		// 			foreignKey: {
		// 				allowNull: false
		// 			}
		// 		})
		// 	}
		// }
	});

	return Concerts;		
};