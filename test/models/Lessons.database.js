const {Model, DataTypes} = require("sequelize");
const sequelize = require("../controllers/connectDatabase.js");

class Lessons extends Model {}
Lessons.init(
	{
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		title: {
			type: DataTypes.STRING(100),
		},
		status: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	}, 
	{
		sequelize,
		modelName: "lessons",
		timestamps: false
	}
);

module.exports = Lessons;