const express = require("express");
// const stylus = require("stylus");
// const nib = require("nib");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
const config = require("./config/key");

const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// function compile(str, path) {
//     return stylus(str).set("filename", path).use(nib());
// }
// app.set("views", __dirname + "/views");
// app.set("view engine", "jade");
app.use(morgan("combined"));
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// app.use(stylus.middleware({ src: __dirname + "/public", compile: compile }));
// app.use(express.static(__dirname + "/public"));
app.use("/api", routes);
// app.use(express.static(path.join(__dirname, "client/build")));
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

if (process.env.NODE_ENV === "production") {
    // Set static folder
    // All the javascript and css files will be read and served from this folder
    app.use(express.static("client/build"));

    // index.html for all page routes    html or routing and naviagtion
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
    console.log("Express server listening on port ", PORT); // eslint-disable-line
});
