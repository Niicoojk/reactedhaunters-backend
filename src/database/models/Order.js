module.exports = (sequelize, dataTypes) => {
	let alias = "Order";
	let cols = {
		order_id: {
			type: dataTypes.INTEGER(12),
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		user_address_id: {
			type: dataTypes.INTEGER(12),
			allowNull: false,
		},
		amount_total: {
			type: dataTypes.FLOAT,
			allowNull: false,
		},
		order_date: {
			type: dataTypes.DATE(6),
			default: dataTypes.NOW,
			allowNull: false,
		},
	};
	let config = {
		tableName: "orders",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	};

	let Order = sequelize.define(alias, cols, config);

	Order.associate = (models) => {
		Order.hasMany(models.UserAddress, {
			as: "order_address",
			foreignKey: "user_address_id",
		});
	};

	Order.associate = (models) => {
		Order.belongsTo(models.OrderDetail, {
			as: "order_details",
			foreignKey: "order_id",
		});
	};

	return Order;
};
