const MongoClient = require("mongodb").MongoClient;
const constants = require("./constants");
const moment = require("moment");

const uri =
    "mongodb+srv://user:LTfJoXV9VX7JA7KX@vocal-center-stats.ymyj5.gcp.mongodb.net/vocal?retryWrites=true&w=majority";

const connect = async () => {
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    return client.db("vocal");
};

const saveListening = async (data) => {
    const connection = await connect();
    const collection = connection.collection("listening");
    await collection.insertMany(data);
    return "saved successfully";
};

const saveLesson = async (data) => {
    const connection = await connect();
    const collection = connection.collection("lesson");
    await collection.insertMany(data);
    return "saved successfully";
};

const saveStudent = async (data) => {
    const connection = await connect();
    const collection = connection.collection("student");
    await collection.insertMany(data);
    return "saved successfully";
};

const getListeningData = async (page, fromDate, toDate, klass, lesson, teacher, fromSeconds, toSeconds) => {
    const connection = await connect();
    const collection = connection.collection("listening");
   
    const query = {};
    if (lesson) query.extension = lesson;
    if (fromDate) query.date = { $gte: moment(fromDate).toDate() };
    if (toDate) query.date = { ...query.date, $lte: moment(toDate).toDate() };
    if (fromSeconds) query.seconds = { $gte: Number(fromSeconds) };
    if (toSeconds) query.seconds = { ...query.seconds, $lte: Number(toSeconds) };
    console.log(query);

    const result = await collection
        .find(query)
        .skip(constants.pageSize * (page - 1))
        .limit(constants.pageSize)
        .toArray();
    return result;
};

module.exports = {
    saveListening,
    saveLesson,
    saveStudent,
    getListeningData,
};
