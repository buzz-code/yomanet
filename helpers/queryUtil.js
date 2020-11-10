function getQuery(user) {
    return [{ user: user.name }];
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

module.exports = { getQuery, klass, megama, lesson, name, dates };
