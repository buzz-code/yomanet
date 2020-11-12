const { User } = require("../models/User");
const mongoose = require("mongoose");
const mongoURI = "mongodb://USERNAME:PASSWORD@localhost:PORT/vocal?authSource=admin";
const { YemotPlayback } = require("../models/YemotPlayback");
const { LessonInstance } = require("../models/LessonInstance");

async function main() {
    console.log("updateLessonInstance start");
    try {
        const connect = mongoose
            .connect(mongoURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            })
            .then(() => console.log("MongoDB Connected..."))
            .catch((err) => console.log("MongoDB connect error", err));

        const users = await User.find({ provider: "yemot" }).lean();
        for (const user of users) {
            console.log("start process for user:", user.name);
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

                console.log("end process for user:", user.name);
            } catch (err) {
                console.log("error for user:", user.name, err);
            }
        }
        console.log("updateLessonInstance finished successfully");
    } catch (err) {
        console.log("updateLessonInstance finished with an error", err);
    } finally {
        mongoose.connection.close(function () {
            console.log("Mongoose connection disconnected");
            process.exit(0);
        });
    }
}

main().then(console.log);
