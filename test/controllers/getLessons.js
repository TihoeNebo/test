const sequelize = require("./connectDatabase.js");
const selectLessonIds = require("./selectLessonIds.js");
const selectLessons = require("./selectLessons.js");
const Filter = require("../models/Filter.js");
const Lesson = require("../models/Lesson.js");


module.exports = async function(req, res) {
	try {
		let query = new Filter(req.query);		
		let sortedIds = await selectLessonIds(query);
		let data = await selectLessons(sortedIds);
		let lessons = [];
		data.forEach( (lesson) => {
			if (!lessons.length || lessons[lessons.length-1].id != lesson.id) {
				lessons.push( new Lesson(lesson) );
			} else {
				
				let students = lessons[lessons.length-1].students;
				let teachers = lessons[lessons.length-1].teachers;
				
				if (students.length && students[students.length-1].id < lesson.studentId) {
					if (lesson.visit) lessons[lessons.length-1].visitCount++;
					students.push({
						id: lesson.studentId,
						name: lesson.studentName,
						visit: lesson.visit
					})
				} 
				if (teachers.length && teachers[teachers.length-1].id < lesson.teacherId) {
					teachers.push({
						id: lesson.teacherId,
						name: lesson.teacherName
					})
				}
			}
		} );
		res.send(lessons);
	} catch (e) {
		res.status(400).send({error: e.message});
	}
}

