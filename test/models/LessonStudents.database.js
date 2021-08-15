const {Model, DataTypes} = require("sequelize");
const sequelize = require("../controllers/connectDatabase.js");

class LessonStudents extends Model {}
LessonStudents.init(
	{
		lesson_id: {
			type: DataTypes.INTEGER
		},
		student_id: {
			type: DataTypes.INTEGER
		},
		visit: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, 
	{
		sequelize,
		
		modelName: "lesson_students",
		timestamps: false
	}
);

LessonStudents.removeAttribute('id');

module.exports = LessonStudents;