const express = require("express");
const stylus = require("stylus");
const nib = require("nib");
const morgan = require('morgan')
const routes = require("./routes");
const bodyParser = require('body-parser')
// const multer = require('multer')

const app = express();

function compile(str, path) {
    return stylus(str).set("filename", path).use(nib());
}
app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(stylus.middleware({ src: __dirname + "/public", compile: compile }));
app.use(express.static(__dirname + "/public"));
app.use(routes)

const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
    console.log("Express server listening on port ", PORT); // eslint-disable-line
});
