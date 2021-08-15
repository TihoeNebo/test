const sequelize = require("./connectDatabase.js");
const Lessons = require("../models/Lessons.database.js");
const LessonTeachers = require("../models/LessonTeachers.database.js");
const LessonStudents = require("../models/LessonStudents.database.js");

module.exports = async function(query) {
	let sortedIds = await Lessons.findAll({
		where: query.lessonsFilter,
		include: [ {
			model: LessonTeachers,
			where: query.teacherFilter,
			attributes: [],
			required: !!query.teacherFilter.teacher_id
		}, {
			model: LessonStudents,
			attributes: [],
			required: false
		} ],
		raw: true,
		subQuery:false,
		attributes: [
			[sequelize.fn('DISTINCT', sequelize.col('lessons.id') ), "id"]
		],
		group: ["lessons.id",  'lesson_teachers.teacher_id'],
		having: [
			(!!query.studentFilter) ? sequelize.where(sequelize.fn('COUNT', sequelize.col('lesson_students.lesson_id') ), query.studentFilter) : {}
		],
		order: ["id"],
		offset: (query.page-1) * query.lessonsPerPage,
		limit: query.lessonsPerPage
	});
	sortedIds = sortedIds.map((item)=> {return item = item.id;});
	return sortedIds;
};

