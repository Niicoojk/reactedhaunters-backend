module.exports = (sequelize, dataTypes) => {
	let alias = "Product";
	let cols = {
		product_id: {
			type: dataTypes.INTEGER(10),
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		universe_id: {
			type: dataTypes.INTEGER(10),
			allowNull: false,
		},
		tier_id: {
			type: dataTypes.INTEGER(10),
			allowNull: false,
		},
		name: {
			type: dataTypes.STRING(100),
			allowNull: false,
		},
		short_desc: {
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
		deleted: {
			type: dataTypes.BOOLEAN,
			default: 0,
			allowNull: false,
		},
	};
	let config = {
		tableName: "products",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	};

	const Product = sequelize.define(alias, cols, config);

	Product.associate = function (models) {
		Product.hasMany(models.Tier, {
			as: "tiers",
			foreignKey: "tier_id",
		});
	};

	Product.associate = (models) => {
		Product.belongsTo(models.OrderDetail, {
			as: "ordered_product",
			foreignKey: "product_id",
		});
	};

	Product.associate = (models) => {
		Product.belongsTo(models.UserFavourite, {
			as: "product_favourites",
			foreignKey: "product_id",
		});
	};

	Product.associate = function (models) {
		Product.belongsToMany(models.User, {
			through: "belongings",
			as: "belongs",
			foreignKey: "product_id",
			otherKey: "user_id",
			timestamps: false,
		});
	};

	return Product;
};
