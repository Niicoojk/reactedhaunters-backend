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
		created_at: {
			type: dataTypes.DATE(6),
			default: dataTypes.NOW,
			allowNull: false,
		},
		updated_at: {
			type: dataTypes.DATE(6),
			default: dataTypes.NOW,
			allowNull: false,
		},
		deleted: {
			type: dataTypes.BOOLEAN,
			default: 0,
			allowNull: false,
		},
	};
	let config = {
		tableName: "users_addresses",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
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
