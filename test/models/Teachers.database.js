const {Model, DataTypes} = require("sequelize");
const sequelize = require("../controllers/connectDatabase.js");

class Teachers extends Model {}
Teachers.init(
	{
		name: {
			type: DataTypes.STRING(10),
		}
	}, 
	{
		sequelize,
		modelName: "teachers",
		timestamps: false
	}
);

module.exports = Teachers;