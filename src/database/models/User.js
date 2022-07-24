module.exports = (sequelize, dataTypes) => {
	let alias = "User";
	let cols = {
		user_id: {
			type: dataTypes.INTEGER(10),
			primaryKey: true,
			autoIncrement: true,
		},
		admin: {
			type: dataTypes.BOOLEAN,
			allowNull: false,
			default: 0,
		},
		first_name: {
			type: dataTypes.STRING(100),
			allowNull: false,
		},
		last_name: {
			type: dataTypes.STRING(100),
			allowNull: false,
		},
		user_name: {
			type: dataTypes.STRING(100),
			allowNull: false,
			unique: true,
		},
		email: {
			type: dataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: dataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: dataTypes.STRING,
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
		terms_conditions: {
			type: dataTypes.BOOLEAN,
			allowNull: false,
		},
		email_send: {
			type: dataTypes.BOOLEAN,
			allowNull: false,
			default: 0,
		},
		deleted: {
			type: dataTypes.BOOLEAN,
			allowNull: false,
		},
	};
	let config = {
		tableName: "users",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	};

	const User = sequelize.define(alias, cols, config);

	User.associate = function (models) {
		User.belongsTo(models.UserAddress, {
			as: "user_address",
			foreignKey: "user_id",
		});
	};

	User.associate = (models) => {
		User.belongsTo(models.UserFavourite, {
			as: "user_favourites",
			foreignKey: "user_id",
		});
	};

	User.associate = function (models) {
		User.belongsToMany(models.Product, {
			through: "belongings",
			as: "belongs",
			foreignKey: "user_id",
			otherKey: "product_id",
			timestamps: true,
			createdAt: "created_at",
			updatedAt: "updated_at",
		});
	};

	return User;
};
