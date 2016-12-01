"use strict";

module.exports = function(sequelize, DataTypes) {
	var users = sequelize.define("users", {
		user_id: DataTypes.STRING,
		name: DataTypes.STRING,
		email: DataTypes.STRING
	}, {

		underscored: true,

		freezeTableName: true,

		tableName: 'users',

		classMethods: {
			associate: function(models) {
				users.hasMany(models.concerts, {
					onDelete: "CASCADE",
					foreignKey: {
						allowNull: false
					}
				})
			}
		}
	})

	return users;		
};