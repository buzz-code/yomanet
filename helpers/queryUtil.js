const moment = require("moment");
const { Student } = require("../models/Student");
const { getPagingConfig } = require("./utils");

function getQuery(user, filter, ...queryParts) {
    const query = [{ user: user.name }];
    queryParts.forEach((item) => item(filter, query));
    return query;
}

function klass({ klass }, query) {
    if (klass && klass.length)
        query.push({ fullName: new RegExp(`^(${klass.map((item) => item.value).join("|")}).*`) });
}

function megama({ megama }, query) {
    if (megama && megama.length) query.push({ megama: new RegExp(megama.map((item) => item.value).join("|")) });
}

function lesson({ lesson }, query) {
    if (lesson && lesson.length) query.push({ Folder: new RegExp(lesson.map((item) => item.value).join("|")) });
}

function name({ name }, query) {
    if (name) query.push({ name: new RegExp(name) });
}

function dates({ fromDate, toDate }, query) {
    if (fromDate) query.push({ EnterDate: { $gte: moment.utc(fromDate).toDate() } });
    if (toDate) query.push({ EnterDate: { $lte: moment.utc(toDate).toDate() } });
}

function seconds({ fromSeconds, toSeconds }, query) {
    if (fromSeconds) query.push({ TimeTotal: { $gte: Number(fromSeconds) } });
    if (toSeconds) query.push({ TimeTotal: { ...query.seconds, $lte: Number(toSeconds) } });
}

async function filterStudents(query, studentQuery) {
    if (studentQuery.length > 1) {
        const studentIds = await Student.find({ $and: studentQuery }, ["identityNumber"]).lean();
        query.push({ EnterId: { $in: studentIds.map((item) => item.identityNumber) } });
    }
}

async function getQueryWithStudentIds(queries, page) {
    const { query, studentQuery } = queries;
    const students = await Student.find({ $and: studentQuery }, ["identityNumber", "name"], {
        ...getPagingConfig(page),
        sort: { name: 1 },
    }).lean();
    query.push({ EnterId: { $in: students.map((item) => item.identityNumber) } });
    return { query, students };
}

module.exports = { getQuery, klass, megama, lesson, name, seconds, dates, filterStudents, getQueryWithStudentIds };
