"use strict";

module.exports = function(sequelize, DataTypes) {
	var Users = sequelize.define("Users", {
		user_id: DataTypes.STRING,
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		// userPic: DataTypes.STRING,
		favArtists1: DataTypes.STRING,
		favArtists2: DataTypes.STRING,
		favArtists3: DataTypes.STRING,
		favArtists4: DataTypes.STRING,
		favArtists5: DataTypes.STRING
	}, {


	});

	return Users;		
};