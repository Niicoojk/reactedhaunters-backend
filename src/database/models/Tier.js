module.exports = (sequelize, dataTypes) => {
	let alias = "Tier";
	let cols = {
		tier_id: {
			type: dataTypes.INTEGER(6),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		value: {
			type: dataTypes.STRING(20),
			allowNull: false,
		},
	};
	let config = {
		tableName: "tiers",
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	};

	const Tier = sequelize.define(alias, cols, config);

	Tier.associate = function (models) {
		Tier.belongsTo(models.Product, {
			as: "tiers",
			foreignKey: "tier_id",
		});
	};

	return Tier;
};
