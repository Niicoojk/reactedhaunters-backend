module.exports = (sequelize, dataTypes) => {
	let alias = "UserAddress";
	let cols = {
		user_address_id: {
			type: dataTypes.INTEGER(12),
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		user_id: {
			type: dataTypes.INTEGER(10),
			allowNull: false,
		},
		address_id: {
			type: dataTypes.INTEGER(12),
			allowNull: false,
		},
	};
	let config = {
		tableName: "users_addresses",
		timestamps: false,
	};

	const UserAddress = sequelize.define(alias, cols, config);

	UserAddress.associate = (models) => {
		UserAddress.hasMany(models.User, {
			as: "user_address",
			foreignKey: "user_id",
		});
	};

	UserAddress.associate = (models) => {
		UserAddress.hasMany(models.Address, {
			as: "addresses",
			foreignKey: "address_id",
		});
	};

	UserAddress.associate = (models) => {
		UserAddress.belongsTo(models.Order, {
			as: "order_address",
			foreignKey: "user_address_id",
		});
	};

	return UserAddress;
};
