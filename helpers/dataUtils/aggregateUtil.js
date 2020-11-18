const groupByField = {
    listening: "$Current",
    conf: { $dateToString: { format: "%Y-%m-%d", date: "$EnterDate" } },
};

function getAggregateByKlassAndLesson(query, reportType) {
    return [
        { $match: { $and: query } },
        {
            $group: {
                _id: { EnterId: "$EnterId", Folder: "$Folder", Group: groupByField[reportType] },
                TimeTotal: { $sum: "$TimeTotal" },
            },
        },
        {
            $group: {
                _id: { EnterId: "$_id.EnterId", Folder: "$_id.Folder" },
                items: { $addToSet: { Group: "$_id.Group", TimeTotal: { $sum: "$TimeTotal" } } },
            },
        },
        { $project: { tmp: { $arrayToObject: { $zip: { inputs: ["$items.Group", "$items.TimeTotal"] } } } } },
        { $addFields: { "tmp.EnterId": "$_id.EnterId", "tmp.Folder": "$_id.Folder" } },
        { $replaceRoot: { newRoot: "$tmp" } },
    ];
}

function getAggregateByKlassOrMegama(query) {
    return [
        { $match: { $and: query } },
        {
            $group: {
                _id: { EnterId: "$EnterId", Folder: "$Folder" },
                TimeTotal: { $sum: "$TimeTotal" },
            },
        },
        {
            $group: {
                _id: { EnterId: "$_id.EnterId" },
                items: { $addToSet: { Folder: "$_id.Folder", TimeTotal: { $sum: "$TimeTotal" } } },
            },
        },
        { $project: { tmp: { $arrayToObject: { $zip: { inputs: ["$items.Folder", "$items.TimeTotal"] } } } } },
        { $addFields: { "tmp.EnterId": "$_id.EnterId" } },
        { $replaceRoot: { newRoot: "$tmp" } },
    ];
}

function getAggregateByKlassPerStudent(query) {
    return [
        { $match: { $and: query } },
        {
            $group: {
                _id: { EnterId: "$EnterId" },
                TimeTotal: { $sum: "$TimeTotal" },
            },
        },
        { $addFields: { EnterId: "$_id.EnterId" } },
    ];
}

function getAggregateForDiploma(query, reportType) {
    return [
        { $match: { $and: query } },
        {
            $group: {
                _id: { EnterId: "$EnterId", Folder: "$Folder", Group: groupByField[reportType] },
                TimeTotal: { $sum: "$TimeTotal" },
            },
        },
        {
            $group: {
                _id: { EnterId: "$_id.EnterId", Folder: "$_id.Folder" },
                items: {
                    $push: {
                        Group: "$_id.Group",
                        TimeTotal: "$TimeTotal",
                    },
                },
            },
        },
        {
            $group: {
                _id: { EnterId: "$_id.EnterId" },
                items: {
                    $push: {
                        Folder: "$_id.Folder",
                        Stats: { $arrayToObject: { $zip: { inputs: ["$items.Group", "$items.TimeTotal"] } } },
                    },
                },
            },
        },
        { $project: { tmp: { $arrayToObject: { $zip: { inputs: ["$items.Folder", "$items.Stats"] } } } } },
        { $addFields: { "tmp.EnterId": "$_id.EnterId" } },
        { $replaceRoot: { newRoot: "$tmp" } },
    ];
}

module.exports = {
    getAggregateByKlassAndLesson,
    getAggregateByKlassOrMegama,
    getAggregateByKlassPerStudent,
    getAggregateForDiploma,
};
