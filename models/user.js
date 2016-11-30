"use strict";

module.exports = function(sequelize, DataTypes) {
	var Users = sequelize.define("Users", {
		user_id: DataTypes.STRING,
		name: DataTypes.STRING,
		email: DataTypes.STRING
	}, {

		underscored: true,

		freezeTableName: true,

		tableName: 'users',

		classMethods: {
			associate: function(models) {
				Users.hasMany(models.Concerts, {
					onDelete: "CASCADE",
					hooks: true,
					foreignKey: {
						allowNull: false
					}
				})
			}
		}
	})

	return Users;		
};