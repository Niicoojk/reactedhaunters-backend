module.exports = (sequelize, dataTypes) => {
	let alias = "ProductTier";
	let cols = {
		product_tier_id: {
			type: dataTypes.INTEGER(12),
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		product_id: {
			type: dataTypes.INTEGER(10),
			allowNull: false,
		},
		tier_id: {
			type: dataTypes.INTEGER(6),
			allowNull: false,
		},
		long_desc: {
			type: dataTypes.TEXT,
			allowNull: false,
		},
		price: {
			type: dataTypes.FLOAT,
			allowNull: false,
		},
		image: {
			type: dataTypes.STRING(400),
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
		tableName: "product_tier",
		timestamps: true,
		createdAt: false,
		updatedAt: false,
	};

	const ProductTier = sequelize.define(alias, cols, config);

	ProductTier.associate = function (models) {
		ProductTier.hasMany(models.Product, {
			as: "productVariants",
			foreignKey: "product_id",
		});
	};
	ProductTier.associate = function (models) {
		ProductTier.hasMany(models.Tier, {
			as: "tiers",
			foreignKey: "tier_id",
		});
	};

	ProductTier.associate = function (models) {
		ProductTier.belongsToMany(models.User, {
			through: "user_favourites",
			as: "favourites",
			foreignKey: "product_tier_id",
			otherKey: "user_id",
			timestamps: false,
		});
	};

	ProductTier.associate = function (models) {
		ProductTier.belongsToMany(models.User, {
			through: "belongings",
			as: "belongs",
			foreignKey: "product_tier_id",
			otherKey: "user_id",
			timestamps: false,
		});
	};

	ProductTier.associate = (models) => {
		ProductTier.belongsTo(models.UserFavourite, {
			as: "product_favourites",
			foreignKey: "product_id",
		});
	};

	ProductTier.associate = (models) => {
		ProductTier.belongsTo(models.OrderDetail, {
			as: "order_products",
			foreignKey: "product_tier_id",
		});
	};

	return ProductTier;
};
