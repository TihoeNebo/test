class FilterError extends Error {
	constructor (...params) {
		super(...params);
		this.name = params[0];
		this.message = `неверно введен параметр ${this.name}`;
	}
	
}

module.exports = FilterError;