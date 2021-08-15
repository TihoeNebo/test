const {Model, DataTypes} = require("sequelize");
const sequelize = require("../controllers/connectDatabase.js");

class Students extends Model {}
Students.init(
	{
		
		name: {
			type: DataTypes.STRING(10),
		}
	}, 
	{
		sequelize,
		modelName: "students",
		timestamps: false
	}
);

module.exports = Students;