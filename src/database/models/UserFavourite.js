const { INTEGER } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
	let alias = "UserFavourite";
	let cols = {
		user_favourite_id: {
			type: dataTypes.INTEGER(12),
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		user_id: {
			type: dataTypes.INTEGER(10),
			allowNull: false,
		},
		product_id: {
			type: dataTypes.INTEGER(10),
			allowNull: false,
		},
	};
	let config = {
		tableName: "user_favourites",
		timestamps: false,
	};

	let UserFavourite = sequelize.define(alias, cols, config);

	UserFavourite.associate = (models) => {
		UserFavourite.hasMany(models.User, {
			as: "user_favourites",
			foreignKey: "user_id",
		});
	};

	UserFavourite.associate = (models) => {
		UserFavourite.hasMany(models.ProductTier, {
			as: "product_favourites",
			foreignKey: "product_id",
		});
	};

	return UserFavourite;
};
