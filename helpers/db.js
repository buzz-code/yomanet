const MongoClient = require("mongodb").MongoClient;
const constants = require("./constants");

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

const getListeningData = async (page, dateRange, klass, lesson, teacher, seconds) => {
    const connection = await connect();
    const collection = connection.collection("listening");
    const query = {};
    if (seconds) query.seconds = seconds;
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
