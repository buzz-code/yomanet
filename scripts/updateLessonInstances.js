const { User } = require("../models/User");
const mongoose = require("mongoose");
const mongoURI = "mongodb://USERNAME:PASSWORD@localhost:PORT/vocal?authSource=admin";
const { YemotPlayback } = require("../models/YemotPlayback");
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
        const users = await User.find({ provider: "yemot" }).lean();
        for (const user of users) {
            log("start process for user:", user.name);
            try {
                const data = await YemotPlayback.aggregate()
                    .match({ user: user.name, FileLength: { $ne: null } })
                    .group({
                        _id: { Folder: "$Folder", Current: "$Current" },
                        FileLength: { $first: "$FileLength" },
                    })
                    .project({
                        _id: 0,
                        user: user.name,
                        Folder: "$_id.Folder",
                        Current: "$_id.Current",
                        FileLength: "$FileLength",
                    });

                await LessonInstance.deleteMany({ user: user.name });
                await LessonInstance.insertMany(data);

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
