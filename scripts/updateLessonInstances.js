const { User } = require("../models/User");
const mongoose = require("mongoose");
const mongoURI = "mongodb://USERNAME:PASSWORD@localhost:PORT/vocal?authSource=admin";
// const mongoURI = "mongodb://localhost:27017/vocal";
const { YemotPlayback } = require("../models/YemotPlayback");
const { YemotConfBridge } = require("../models/YemotConfBridge");
const { YemotPlayDir } = require("../models/YemotPlayDir");
const { LessonInstance } = require("../models/LessonInstance");
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
                const listening = await YemotPlayback.aggregate()
                    .allowDiskUse(true)
                    .match({ user: user.name })
                    .group({
                        _id: { Folder: "$Folder", Current: "$Current", FileLength: "$FileLength" },
                        count: { $sum: 1 },
                        LongestListening: { $max: "$TimeTotal" },
                        FirstListeningDate: { $min: "$EnterDate" },
                        EnterHebrewDate: { $first: { $cond: { if: { $eq: ["$EnterDate", { $min: "$EnterDate" }] }, then: "$EnterHebrewDate", else: null } } },
                        LessonTitle: { $max: "$LessonTitle" },
                    })
                    .sort({ "_id.FileLength": 1, count: -1 })
                    .group({
                        _id: { Folder: "$_id.Folder", Current: "$_id.Current" },
                        FileLength: { $first: "$_id.FileLength" },
                        LongestListening: { $max: "$LongestListening" },
                        FirstListeningDate: { $min: "$FirstListeningDate" },
                        EnterHebrewDate: { $first: "$EnterHebrewDate" },
                        LessonTitle: { $max: "$LessonTitle" },
                        count: { $sum: "$count" },
                    })
                    .project({
                        _id: 0,
                        user: user.name,
                        Folder: "$_id.Folder",
                        Current: "$_id.Current",
                        FileLength: "$FileLength",
                        LongestListening: "$LongestListening",
                        FirstListeningDate: "$FirstListeningDate",
                        EnterHebrewDate: "$EnterHebrewDate",
                        LessonTitle: "$LessonTitle",
                        Count: "$count",
                        type: "listening",
                    });
                log(listening && listening[0]);

                const conf = await YemotConfBridge.aggregate()
                    .allowDiskUse(true)
                    .match({ user: user.name })
                    .group({
                        _id: {
                            Folder: { $arrayElemAt: [{ $split: ["$ConfBridge", "-"] }, 1] },
                            EnterDate: { $dateToString: { format: "%Y-%m-%d", date: "$EnterDate" } },
                        },
                        count: { $sum: 1 },
                        FileLength: { $sum: "$FileLength" },
                        LongestListening: { $max: "$TimeTotal" },
                        FirstListeningDate: { $min: "$EnterDate" },
                        EnterHebrewDate: { $first: { $cond: { if: { $eq: ["$EnterDate", { $min: "$EnterDate" }] }, then: "$EnterHebrewDate", else: null } } },
                        LessonTitle: { $max: "$LessonTitle" },
                    })
                    .project({
                        _id: 0,
                        user: user.name,
                        Folder: "$_id.Folder",
                        EnterDate: "$_id.EnterDate",
                        FileLength: "$FileLength",
                        LongestListening: "$LongestListening",
                        FirstListeningDate: "$FirstListeningDate",
                        EnterHebrewDate: "$EnterHebrewDate",
                        LessonTitle: "$LessonTitle",
                        Count: "$count",
                        type: "conf",
                    });
                log(conf && conf[0]);

                const record = await YemotPlayDir.aggregate()
                    .allowDiskUse(true)
                    .match({ user: user.name })
                    .group({
                        _id: {
                            Folder: "$Folder",
                            EnterDate: { $dateToString: { format: "%Y-%m-%d", date: "$EnterDate" } },
                        },
                        count: { $sum: 1 },
                        FileLength: { $max: "$FileLength" },
                        LongestListening: { $max: "$TimeTotal" },
                        FirstListeningDate: { $min: "$EnterDate" },
                        EnterHebrewDate: { $first: { $cond: { if: { $eq: ["$EnterDate", { $min: "$EnterDate" }] }, then: "$EnterHebrewDate", else: null } } },
                    })
                    .project({
                        _id: 0,
                        user: user.name,
                        Folder: "$_id.Folder",
                        EnterDate: "$_id.EnterDate",
                        FileLength: "$FileLength",
                        LongestListening: "$LongestListening",
                        FirstListeningDate: "$FirstListeningDate",
                        EnterHebrewDate: "$EnterHebrewDate",
                        Count: "$count",
                        type: "record",
                    });
                log(record && record[0]);

                const listeningByDate = await YemotPlayback.aggregate()
                    .allowDiskUse(true)
                    .match({ user: user.name })
                    .group({
                        _id: {
                            Folder: "$Folder",
                            EnterDate: { $dateToString: { format: "%Y-%m-%d", date: "$EnterDate" } },
                            FileLength: "$FileLength",
                        },
                        count: { $sum: 1 },
                        LongestListening: { $max: "$TimeTotal" },
                        FirstListeningDate: { $min: "$EnterDate" },
                        EnterHebrewDate: { $first: { $cond: { if: { $eq: ["$EnterDate", { $min: "$EnterDate" }] }, then: "$EnterHebrewDate", else: null } } },
                        LessonTitle: { $max: "$LessonTitle" },
                    })
                    .sort({ "_id.FileLength": 1, count: -1 })
                    .group({
                        _id: {
                            Folder: "$_id.Folder",
                            EnterDate: "$_id.EnterDate",
                        },
                        FileLength: { $first: "$_id.FileLength" },
                        LongestListening: { $max: "$LongestListening" },
                        FirstListeningDate: { $min: "$FirstListeningDate" },
                        EnterHebrewDate: { $first: "$EnterHebrewDate" },
                        LessonTitle: { $max: "$LessonTitle" },
                        count: { $sum: "$count" },
                    })
                    .project({
                        _id: 0,
                        user: user.name,
                        Folder: "$_id.Folder",
                        EnterDate: "$_id.EnterDate",
                        FileLength: "$FileLength",
                        LongestListening: "$LongestListening",
                        FirstListeningDate: "$FirstListeningDate",
                        EnterHebrewDate: "$EnterHebrewDate",
                        LessonTitle: "$LessonTitle",
                        Count: "$count",
                        type: "listeningByDate",
                    });
                log(listeningByDate && listeningByDate[0]);

                let dataToSave = [...listening, ...conf, ...record, ...listeningByDate];
                dataToSave = dataToSave.filter(
                    (item) => (!user.minListening || item.FileLength >= user.minListening || item.LongestListening >= user.minListening)
                        && (!user.minListeners || item.Count >= user.minListeners)
                );
                log('length of data', listening.length + conf.length + record.length + listeningByDate.length, 'length of data to save', dataToSave.length)
                await LessonInstance.deleteMany({ user: user.name });
                await LessonInstance.insertMany(dataToSave);

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
