const { User } = require("../models/User");
const mongoose = require("mongoose");
const mongoURI = "mongodb://USERNAME:PASSWORD@localhost:PORT/vocal?authSource=admin";
// const mongoURI = "mongodb://localhost:27017/vocal";
const { YemotPlayback } = require("../models/YemotPlayback");
const { YemotConfBridge } = require("../models/YemotConfBridge");
const { YemotPlayDir } = require("../models/YemotPlayDir");
const { LessonInstance } = require("../models/LessonInstance");
const { Lesson } = require("../models/Lesson");
const { sendEmail } = require("../helpers/mailer");

async function main() {
    const logs = [];
    function log(...args) {
        console.log(...args);
        logs.push(JSON.stringify(args));
    }

    log("updateLessonInstance start");
    try {
        const connect = await mongoose
            .connect(mongoURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            })
            .then(() => log("MongoDB Connected..."));
        const users = await User.find().lean();
        for (const user of users) {
            log("start process for user:", user.name);
            try {
                await LessonInstance.deleteMany({ user: user.name });
                const lessons = await Lesson.find({}, ["extension", "confExtension"]).lean();
                const confExtensionDict = Object.fromEntries(
                    lessons.map((item) => [item.confExtension, item.extension])
                );

                const data = await YemotPlayback.aggregate()
                    .match({ user: user.name })
                    .group({
                        _id: { Folder: "$Folder", Current: "$Current" },
                        FileLength: { $max: "$FileLength" },
                        LongestListening: { $max: "$TimeTotal" },
                        FirstListeningDate: { $min: "$EnterDate" },
                    })
                    .project({
                        _id: 0,
                        user: user.name,
                        Folder: "$_id.Folder",
                        Current: "$_id.Current",
                        FileLength: "$FileLength",
                        LongestListening: "$LongestListening",
                        FirstListeningDate: "$FirstListeningDate",
                        type: "listening",
                    });
                log(data && data[0]);

                await LessonInstance.insertMany(data);

                const conf = await YemotConfBridge.aggregate()
                    .match({ user: user.name })
                    .group({
                        _id: {
                            Folder: "$Folder",
                            EnterDate: { $dateToString: { format: "%Y-%m-%d", date: "$EnterDate" } },
                        },
                        FileLength: { $max: "$FileLength" },
                        LongestListening: { $max: "$TimeTotal" },
                        FirstListeningDate: { $min: "$EnterDate" },
                    })
                    .project({
                        _id: 0,
                        user: user.name,
                        Folder: "$_id.Folder",
                        EnterDate: "$_id.EnterDate",
                        FileLength: "$FileLength",
                        LongestListening: "$LongestListening",
                        FirstListeningDate: "$FirstListeningDate",
                        type: "conf",
                    });
                log(conf && conf[0]);
                conf.forEach((item) => (item.Folder = confExtensionDict[item.Folder] || item.Folder));

                await LessonInstance.insertMany(conf);

                const record = await YemotPlayDir.aggregate()
                    .match({ user: user.name })
                    .group({
                        _id: {
                            Folder: "$Folder",
                            EnterDate: { $dateToString: { format: "%Y-%m-%d", date: "$EnterDate" } },
                        },
                        FileLength: { $max: "$FileLength" },
                        LongestListening: { $max: "$TimeTotal" },
                        FirstListeningDate: { $min: "$EnterDate" },
                    })
                    .project({
                        _id: 0,
                        user: user.name,
                        Folder: "$_id.Folder",
                        EnterDate: "$_id.EnterDate",
                        FileLength: "$FileLength",
                        LongestListening: "$LongestListening",
                        FirstListeningDate: "$FirstListeningDate",
                        type: "record",
                    });
                log(record && record[0]);

                await LessonInstance.insertMany(record);

                log("end process for user:", user.name);
            } catch (err) {
                log("error for user:", user.name, err);
            }
        }
        log("updateLessonInstance finished successfully");
        const info = await sendEmail("hadasa.schechter@gmail.com", "לוגים של cronjob", logs.join("<br/>"));
        console.log(info);
    } catch (err) {
        log("updateLessonInstance finished with an error", err);
        const info = await sendEmail("hadasa.schechter@gmail.com", "לוגים של cronjob", logs.join("<br/>"));
        console.log(info);
    } finally {
        mongoose.connection.close(function () {
            log("Mongoose connection disconnected");
            process.exit(0);
        });
    }
}

main().then(console.log);
