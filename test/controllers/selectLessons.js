const sequelize = require("./connectDatabase.js");
const Lessons = require("../models/Lessons.database.js");
const LessonTeachers = require("../models/LessonTeachers.database.js");
const LessonStudents = require("../models/LessonStudents.database.js");
const Teachers = require("../models/Teachers.database.js");
const Students = require("../models/Students.database.js");

module.exports = async function(sortedIds) {
		
	let data = await Lessons.findAll({
			where: {"id": sortedIds},
			include: [ {
				model: LessonStudents,
				include: {
					model: Students,
					attributes: [],
					required: false
				},
				attributes: [],
				required: false
			},{
				model: LessonTeachers,
				attributes: [],
				required: false, 
				include: { 
					model: Teachers,
					attributes: [],
					required: false
				}
			}],
			raw: true,
			
			attributes: [
				"id", 
				"date", 
				"title", 
				"status", 
				[sequelize.literal('"lesson_teachers"."teacher_id"'),'teacherId'],
				[sequelize.literal('"lesson_teachers->teacher"."name"'),'teacherName'],			
				[sequelize.literal('"lesson_students->student"."id"'),'studentId'],
				[sequelize.literal('"lesson_students->student"."name"'),'studentName'],
				[sequelize.literal('"lesson_students"."visit"'),'visit']
			],
			order: [ 'id', sequelize.literal('"lesson_students->student"."id"'), sequelize.literal('"lesson_teachers"."teacher_id"')]
		});
		return data;
};

