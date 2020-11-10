module.exports = (query) => {
    return [
        { $match: { $and: query } },
        {
            $group: {
                _id: { EnterId: "$EnterId", Folder: "$Folder", Current: "$Current" },
                TimeTotal: { $sum: "$TimeTotal" },
            },
        },
        {
            $group: {
                _id: { EnterId: "$_id.EnterId", Folder: "$_id.Folder" },
                items: { $addToSet: { Current: "$_id.Current", TimeTotal: { $sum: "$TimeTotal" } } },
            },
        },
        { $project: { tmp: { $arrayToObject: { $zip: { inputs: ["$items.Current", "$items.TimeTotal"] } } } } },
        { $addFields: { "tmp.EnterId": "$_id.EnterId", "tmp.Folder": "$_id.Folder" } },
        { $replaceRoot: { newRoot: "$tmp" } },
    ];
};
