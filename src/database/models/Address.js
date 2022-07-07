module.exports = (sequelize, dataTypes) => {
	let alias = "Address";
	let cols = {
		address_id: {
			type: dataTypes.INTEGER(12),
			autoIncrement: true,
			primaryKey: true,
		},
		country: {
			type: dataTypes.STRING(100),
			allowNull: false,
		},
		state: {
			type: dataTypes.STRING(100),
			allowNull: false,
		},
		city: {
			type: dataTypes.STRING(100),
			allowNull: false,
		},
		address: {
			type: dataTypes.STRING(100),
			allowNull: false,
		},
		address_number: {
			type: dataTypes.INTEGER(12),
			allowNull: false,
		},
		floor: {
			type: dataTypes.INTEGER(10),
			allowNull: false,
		},
		apartment: {
			type: dataTypes.INTEGER(10),
			allowNull: false,
		},
		postal_code: {
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
	};
	let config = {
		tableName: "addresses",
		timestamps: true,
		createdAt: false,
		updatedAt: false,
	};

	const Address = sequelize.define(alias, cols, config);

	Address.associate = function (models) {
		Address.belongsTo(models.UserAddress, {
			as: "addresses",
			foreignKey: "address_id",
		});
	};

	return Address;
};
