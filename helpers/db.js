const MongoClient = require("mongodb").MongoClient;
const constants = require("./constants");

const uri =
    "mongodb+srv://user:LTfJoXV9VX7JA7KX@vocal-center-stats.ymyj5.gcp.mongodb.net/vocal?retryWrites=true&w=majority";

const connect = async (collection) => {
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    return client.db("vocal").collection(collection);
};

const saveListening = async (data) => {
    const collection = await connect("listening");
    await collection.insertMany(data);
    return "saved successfully";
};

const saveLesson = async (data) => {
    const collection = await connect("lesson");
    await collection.insertMany(data);
    return "saved successfully";
};

const saveStudent = async (data) => {
    const collection = await connect("student");
    await collection.insertMany(data);
    return "saved successfully";
};

const getListeningData = async () => {
    const collection = await connect("listening");
    const result = await collection.find().limit(constants.pageSize).toArray();
    return result;
};

module.exports = {
    saveListening,
    saveLesson,
    saveStudent,
    getListeningData,
};
