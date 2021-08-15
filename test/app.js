const express = require("express");
const pars = require("body-parser");
const sequelize = require("./controllers/connectDatabase.js");
const getLessons = require("./controllers/getLessons.js");
const postLessons = require("./controllers/postLessons.js");
const app = express();
const jpars = pars.json();
require("./models/relations.js"); // вызывает зависимости таблиц hasMany, belongsTo...

app.get("/", getLessons);

app.post("/lessons", jpars, postLessons);

app.listen(3000, ()=> {
	console.log("Сервер ожидает подключения...");
});
