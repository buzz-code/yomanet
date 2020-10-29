console.log("process env", process.env);

const express = require("express");
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
const connect = mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log("MongoDB Connected...", process.env))
    .catch((err) => console.log(err));

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

app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + "/client/build/index.html"));
    });
}

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, function () {
    console.log("Express server listening on port ", PORT);
});

server.timeout = 4 * 60 * 1000;
