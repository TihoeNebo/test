const Lessons = require("./Lessons.database.js");
const LessonTeachers = require("./LessonTeachers.database.js");
const LessonStudents = require("./LessonStudents.database.js");
const Teachers = require("./Teachers.database.js");
const Students = require("./Students.database.js");

Lessons.hasMany(LessonTeachers, {foreignKey: "lesson_id"} );
Lessons.hasMany(LessonStudents, {foreignKey: "lesson_id"} );
LessonStudents.belongsTo( Lessons, {foreignKey: "lesson_id"} );
LessonStudents.belongsTo( Students, {foreignKey: "student_id"} );
LessonTeachers.belongsTo( Teachers, {foreignKey: "teacher_id"} ); 
LessonTeachers.belongsTo( Lessons, {foreignKey: "lesson_id"} );
Students.hasMany(LessonStudents, {foreignKey: "student_id"} );
Teachers.hasMany(LessonTeachers, {foreignKey: "teacher_id"} );

