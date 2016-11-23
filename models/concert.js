"use strict";

module.exports = function(sequelize, DataTypes) {
	var Concerts = sequelize.define("Concerts", {
		artist_id: DataTypes.INTEGER,
		artist: DataTypes.STRING,
		eventName: DataTypes.STRING,
		venue: DataTypes.STRING
	}, {

		underscored: true,

		freezeTableName: true,

		tableName: 'concerts',

		classMethods: {
			associate: function(models) {
				Users.belongsTo(models.Users, {
					onDelete: "CASCADE",
					foreignKey: {
						allowNull: false
					}
				})
			}
		}
	});

	return Concerts;		
};