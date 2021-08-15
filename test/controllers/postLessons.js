const sequelize = require("./connectDatabase.js");
const PostFilter = require("../models/PostFilter.js");
const Lessons = require("../models/Lessons.database.js");
const LessonTeachers = require("../models/LessonTeachers.database.js");

module.exports = async function(req, res) {
	try {
		let body = new PostFilter(req.body);
		if (body.teacherIds) await body.checkTeacherIds();
		let endCount = 0;
		for (let i = 0; body.lessonsCount > i; i++) {
			let day = body.days[i%body.days.length];
			let month = (day.getMonth() < 9)? "0" + (day.getMonth()+1): day.getMonth()+1;
			let date = (day.getDate() < 10)? "0" + day.getDate(): day.getDate();
			let lessonDate = `${day.getFullYear()}-${month}-${date}`;
			let {id} = await Lessons.create({
				title: body.title,
				date: lessonDate
			});
			body.lessonIds.push(id);
			day.setDate(day.getDate() + 7);
			if (day > body.lastDate) endCount++;
			if (endCount == body.days.length) break;
			
		}
		if (body.teacherIds) {
			body.lessonIds.forEach( (lessonId) => {
				body.teacherIds.forEach( (teacherId)=> {
					LessonTeachers.create({
						teacher_id: teacherId,
						lesson_id: lessonId
					}).catch((e) => {console.log(e)});
				});
			});
		}
		res.status(200).send(body.lessonIds);
	} catch (e) {;
		res.status(400).send({error: e.message});
	}
}

