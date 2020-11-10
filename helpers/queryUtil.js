function getQuery(user) {
    return [{ user: user.name }];
}

function klass({ klass }, studentQuery) {
    if (klass && klass.length)
        studentQuery.push({ fullName: new RegExp(`^(${klass.map((item) => item.value).join("|")}).*`) });
}

function megama({ megama }, studentQuery) {
    if (megama && megama.length) studentQuery.push({ megama: new RegExp(megama.map((item) => item.value).join("|")) });
}

function lesson({ lesson }, query) {
    if (lesson && lesson.length) query.push({ Folder: new RegExp(lesson.map((item) => item.value).join("|")) });
}

function name({ name }, studentQuery) {
    if (name) studentQuery.push({ name: new RegExp(name) });
}

function dates({ fromDate, toDate }, query) {
    if (fromDate) query.push({ EnterDate: { $gte: moment.utc(fromDate).toDate() } });
    if (toDate) query.push({ EnterDate: { $lte: moment.utc(toDate).toDate() } });
}

module.exports = { getQuery, klass, megama, lesson, name, dates };
