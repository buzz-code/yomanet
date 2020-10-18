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
    if (fromDate) query.date = { $gte: moment.utc(fromDate).toDate() };
    if (toDate) query.date = { ...query.date, $lte: moment.utc(toDate).toDate() };
    if (fromSeconds) query.seconds = { $gte: Number(fromSeconds) };
    if (toSeconds) query.seconds = { ...query.seconds, $lte: Number(toSeconds) };
    if (lesson) query.extension = Array.isArray(lesson) ? { $in: lesson } : lesson;
    if (klass) query.name = new RegExp(`/^${klass}/`);
    // if (teacher) query.extension = Array.isArray(teacher) ? { $in: teacher } : teacher;
    console.log(query);

    const result = await collection
        .find(query)
        .skip(constants.pageSize * (page - 1))
        .limit(constants.pageSize)
        .toArray();
    return result;
};

const getLessonList = async (searchText) => {
    const connection = await connect();
    const collection = connection.collection("lesson");

    const query = {};
    if (searchText) query.messageName = new RegExp(searchText);
    console.log(query);

    const result = await collection.find(query).limit(10).toArray();
    return result;
};

const getTeacherList = async (searchText) => {
    const connection = await connect();
    const collection = connection.collection("lesson");

    const query = {};
    if (searchText) query.messageName = new RegExp(searchText);
    console.log(query);

    const result = await collection.find(query).limit(10).toArray();
    return result;
};

const getKlassList = async (searchText) => {
    //todo:
    const connection = await connect();
    const collection = connection.collection("lesson");

    const query = {};
    if (searchText) query.messageName = new RegExp(searchText);
    console.log(query);

    const result = await collection.find(query).limit(10).toArray();
    return result;
};

module.exports = {
    saveListening,
    saveLesson,
    saveStudent,
    getListeningData,
    getLessonList,
    getTeacherList,
    getKlassList,
};
