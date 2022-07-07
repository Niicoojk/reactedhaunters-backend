module.exports = (sequelize, dataTypes) => {
	let alias = "OrderDetail";
	let cols = {
		order_id: {
			type: dataTypes.INTEGER(12),
			allowNull: false,
		},
		order_detail_id: {
			type: dataTypes.INTEGER(14),
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		product_tier_id: {
			type: dataTypes.INTEGER(12),
			allowNull: false,
		},
		quantity: {
			type: dataTypes.INTEGER(8),
			allowNull: false,
			default: 1,
		},
		amount: {
			type: dataTypes.FLOAT,
			allowNull: false,
		},
	};
	let config = {
		tableName: "order_details",
		timestamps: false,
	};

	let OrderDetail = sequelize.define(alias, cols, config);

	OrderDetail.associate = (models) => {
		OrderDetail.hasMany(models.Order, {
			as: "order_details",
			foreignKey: "order_id",
		});
	};

	OrderDetail.associate = (models) => {
		OrderDetail.hasMany(models.ProductTier, {
			as: "order_products",
			foreignKey: "product_tier_id",
		});
	};

	return OrderDetail;
};
