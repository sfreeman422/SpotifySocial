"use strict";

module.exports = function(sequelize, DataTypes) {
	var Concerts = sequelize.define("Concerts", {
		user_id: DataTypes.STRING,
		eventName: DataTypes.STRING,
		concert_id: DataTypes.INTEGER,
		eventDate: DataTypes.DATE,
		venueName: DataTypes.STRING,
		venueAddress: DataTypes.STRING,
		artists: DataTypes.STRING,
		ticketURL: DataTypes.STRING,
		attending: { type: DataTypes.BOOLEAN, defaultValue: false }
	}, {


	});

	return Concerts;		
};