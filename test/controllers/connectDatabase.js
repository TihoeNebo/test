const config = require("../config.js");
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(config.dbName, config.user, config.pass, config.params);
sequelize.sync()
.catch( err => console.log(err));

module.exports = sequelize;

