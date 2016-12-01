"use strict";

module.exports = function(sequelize, DataTypes) {
	var concerts = sequelize.define("concerts", {
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
				concerts.belongsTo(models.users, {
					onDelete: "CASCADE",
					foreignKey: {
						allowNull: false
					}
				})
			}
		}
	});

	return concerts;		
};