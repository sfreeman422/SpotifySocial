"use strict";

module.exports = function(sequelize, DataTypes) {
	var Users = sequelize.define("Users", {
		user_id: DataTypes.STRING,
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		favartists1: DataTypes.STRING,
		favartists2: DataTypes.STRING,
		favartists3: DataTypes.STRING,
		favartists4: DataTypes.STRING,
		favartists5: DataTypes.STRING
		// favartists: DataTypes.ARRAY(DataTypes.STRING)
	}, {

		// underscored: true,

		// freezeTableName: true,

		// tableName: 'Users',

		// classMethods: {
		// 	associate: function(models) {
		// 		Users.hasMany(models.Concerts, {
		// 			onDelete: "CASCADE",
		// 			foreignKey: {
		// 				allowNull: false
		// 			}
		// 		})
		// 	}
		// }
	})

	return Users;		
};