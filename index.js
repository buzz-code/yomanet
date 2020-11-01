const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const winston = require("winston"),
    expressWinston = require("express-winston");
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
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

expressWinston.requestWhitelist.splice(expressWinston.requestWhitelist.indexOf("headers"), 1);
app.use(
    expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    })
);

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

app.use(
    expressWinston.errorLogger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    })
);

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

process.on("SIGINT", () => {
    console.info("SIGINT signal received.");

    // Stops the server from accepting new connections and finishes existing connections.
    server.close(function (err) {
        // if error, log and exit with error (1 code)
        if (err) {
            console.error(err);
            process.exit(1);
        }

        // close your database connection and exit with success (0 code)
        // for example with mongoose
        mongoose.connection.close(function () {
            console.log("Mongoose connection disconnected");
            process.exit(0);
        });
    });
});
