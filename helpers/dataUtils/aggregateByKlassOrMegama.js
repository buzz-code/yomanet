module.exports = (query) => {
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
};
