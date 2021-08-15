const {Op} = require("sequelize");
const FilterError = require("../models/FilterError.js");

class Filter {
	constructor (query) {
		
		this.lessonsFilter = {};
		this.teacherFilter = {};
		
		if (query.date) {
			if (Array.isArray(query.date)) query.date = query.date.join();
			let date = query.date.match(/\d\d\d\d-\d\d-\d\d/g);
			if (!date || date.length > 2) throw new FilterError("date");
			
			if (date.length > 1) {
				let a = +(date[0].split("-")).join("");
				let b = +(date[1].split("-")).join("");
				this.lessonsFilter.date = {
					[Op.gte]: (b >= a) ? date[0] : date[1],
					[Op.lte]: (b <= a) ? date[0] : date[1]
				}
			} else {
				this.lessonsFilter.date = date[0];
			}	
		}
		
		
		if (query.status) {
			this.checkNumQuery(query.status, "status");
			if (+query.status > 1) throw new FilterError("status");
			this.lessonsFilter.status = +query.status;
		} 
		
		this.page = 1;
		if (query.page) {
			this.checkNumQuery(query.page, "page");
			this.page = +query.page;
		}
		
		this.lessonsPerPage = 5;
		if (query.lessonsPerPage) {
			this.checkNumQuery(query.lessonsPerPage, "lessonsPerPage");
			this.lessonsPerPage = +query.lessonsPerPage;
		}
		
		
		if (query.teacherIds) {
			let teacherIds = (Array.isArray(query.teacherIds)) ? query.teacherIds : query.teacherIds.split(",");
			if ( teacherIds.find( item => isNaN(item)) ) throw new FilterError("teacherIds"); 
			this.teacherFilter.teacher_id = {
				[Op.in]: teacherIds
			}	
		}
		
		if (query.studentsCount) {
			let studentsCount = (Array.isArray(query.studentsCount)) ? query.studentsCount : query.studentsCount.split(",");
			if (studentsCount.length > 2) throw new FilterError("studentsCount");
			if ( studentsCount.find( item => isNaN(item)) ) throw new FilterError("studentsCount"); 
			if (studentsCount.length > 1) {
				this.studentFilter = {
					[Op.gte]: (+studentsCount[1] >= +studentsCount[0]) ? +studentsCount[0] : +studentsCount[1],
					[Op.lte]: (+studentsCount[1] <= +studentsCount[0]) ? +studentsCount[0] : +studentsCount[1]
				}
			} else {
				this.studentFilter = +studentsCount[0];
			}
		}
			
	}
	checkNumQuery (num, name) {
		if (Array.isArray(num)) throw new FilterError(`${name}. Параметр введен несколько раз`);
		if ( isNaN(num) ) throw new FilterError(name);
	}
};

module.exports = Filter;