const {Model, DataTypes} = require("sequelize");
const sequelize = require("../controllers/connectDatabase.js");

class LessonTeachers extends Model {}
LessonTeachers.init(
	{
		lesson_id: {
			type: DataTypes.INTEGER
		},
		teacher_id: {
			type: DataTypes.INTEGER
		}
		
	}, 
	{
		sequelize,
		modelName: "lesson_teachers",
		timestamps: false,
		
	}
);

LessonTeachers.removeAttribute('id');

module.exports = LessonTeachers;