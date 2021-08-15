class Lesson {
	constructor(lesson) {
		this.id = lesson.id;
		this.date = lesson.date; 
		this.title = lesson.title;
		this.status = lesson.status;
		this.visitCount = (lesson.visit) ? 1 : 0;
		this.students = (lesson.studentId) ? [
			{
				id: lesson.studentId,
				name: lesson.studentName,
				visit: lesson.visit
			}
		] : [];
		this.teachers = (lesson.teacherId) ? [
			{
				id: lesson.teacherId,
				name: lesson.teacherName
			}
		] : [];
		
	}
}

module.exports = Lesson;