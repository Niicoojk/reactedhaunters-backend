module.exports = (sequelize, dataTypes) => {
	let alias = "Universe";
	let cols = {
		universe_id: {
			type: dataTypes.INTEGER(6),
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		universe: {
			type: dataTypes.STRING(100),
			allowNull: false,
		},
	};
	let config = {
		tableName: "universes",
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	};

	const Universe = sequelize.define(alias, cols, config);

	return Universe;
};
