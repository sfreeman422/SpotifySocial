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
		favArtists5: DataTypes.STRING,
		favArtists6: DataTypes.STRING,
		favArtists7: DataTypes.STRING,
		favArtists8: DataTypes.STRING,
		favArtists9: DataTypes.STRING,
		favArtists10: DataTypes.STRING,
		favArtists11: DataTypes.STRING,
		favArtists12: DataTypes.STRING,
		favArtists13: DataTypes.STRING,
		favArtists14: DataTypes.STRING,
		favArtists15: DataTypes.STRING,
		favArtists16: DataTypes.STRING,
		favArtists17: DataTypes.STRING,
		favArtists18: DataTypes.STRING,
		favArtists19: DataTypes.STRING,
		favArtists20: DataTypes.STRING
	}, {


	});

	return Users;		
};