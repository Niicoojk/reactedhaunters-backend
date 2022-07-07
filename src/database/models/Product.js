module.exports = (sequelize, dataTypes) => {
	let alias = "Product";
	let cols = {
		product_id: {
			type: dataTypes.INTEGER(10),
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		universe: {
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
		tier: {
			type: dataTypes.INTEGER(10),
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
		createdAt: false,
		updatedAt: false,
	};

	const Product = sequelize.define(alias, cols, config);

	Product.associate = function (models) {
		Product.belongsTo(models.ProductTier, {
			as: "productVariants",
			foreignKey: "product_id",
		});
	};

	Product.associate = function (models) {
		Product.belongsTo(models.OrderDetail, {
			as: "order_detail",
			foreignKey: "product_id",
		});
	};

	return Product;
};
