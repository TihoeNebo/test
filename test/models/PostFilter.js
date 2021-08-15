const {Op} = require("sequelize");
const FilterError = require("../models/FilterError.js");
const Teachers = require("./Teachers.database.js");

class PostFilter {
	constructor (body) {
		this.lessonIds = [];
		
		if (body.teacherIds) {
			let ids = body.teacherIds;
			if (!Array.isArray(ids)) throw new FilterError('teacherIds. Параметр должен быть массивом');
			if ( ids.find( item => isNaN(item) )  ) throw new FilterError('teacherIds. Допускаются только числа');
			this.teacherIds = ids;
		}
		
		if (!body.title) throw new FilterError('title');
		this.title = body.title;
				
		if (!body.firstDate) throw new FilterError('firstDate. Параметр не задан');
		this.checkDate(body.firstDate, 'firstDate');
		this.firstDate = new Date(body.firstDate);
		
		if (!body.days) throw new FilterError('days. Параметр не задан');
		if ( !Array.isArray(body.days)) throw new FilterError('days. Параметр должен быть массивом');
		if ( body.days.find( item => isNaN(item) || 
		     +item < 0 || +item > 6  ) ) throw new FilterError('days. В качестве значений должны быть числа(0-6)');
		
		this.days = body.days.map( (item)=> {
			let date = new Date(this.firstDate);
			let dif = ( date.getDay() > item ) ? 7 : 0;
			date.setDate(date.getDate() - date.getDay() + dif + item);
			return date;
		})
		this.days.sort((a, b)=> {
			if (a > b) return 1;
			if (a == b) return 0;
			if (a < b) return -1;
		});
		
		let lastDateLimit = new Date(body.firstDate);
		lastDateLimit.setYear(lastDateLimit.getFullYear() + 1);
		let lessonsCountLimit = 300;
		
		if ( (body.lastDate && body.lessonsCount) ||
			 (!body.lastDate && !body.lessonsCount) ) throw new Error("Должен быть введен только один из параметров(lastDate или lessonsCount)");
		if (body.lastDate) {
			this.checkDate(body.lastDate, 'lastDate');
			let lastDate = new Date(body.lastDate);
			this.lastDate = ( lastDate < lastDateLimit) ? lastDate : lastDateLimit;
			this.lessonsCount = lessonsCountLimit;
		} else {
			if ( isNaN(body.lessonsCount) ) throw new FilterError('LessonsCount');
			this.lessonsCount = ( body.lessonsCount < lessonsCountLimit) ? body.lessonsCount : lessonsCountLimit;
			this.lastDate = lastDateLimit;
		}
		 
	}
	checkDate(date, name) {
		if ( typeof(date)!== 'string') throw new FilterError(`${name}. Параметр должен быть строкой`);
		if ( !date.match(/^\d\d\d\d-\d\d-\d\d$/) ) throw new FilterError(`${name}. Формат YYYY-MM-DD не соблюден`);
		if ( isNaN(new Date(date)) ||
			(new Date(date)).getDate() != +[date.match(/\d\d$/)]) throw new FilterError(`${name}. День, месяц или год указаны неверно`);	
	}
	async checkTeacherIds(ids = this.teacherIds) {
		let existingIds = await Teachers.findAll({			
			where: {"id": ids},
			raw: true,
			attributes: ["id"]
		})
		if (existingIds.length != ids.length) {
			throw new FilterError('teacherIds. Указаны несуществующие id');
		}
	}	
}

module.exports = PostFilter;