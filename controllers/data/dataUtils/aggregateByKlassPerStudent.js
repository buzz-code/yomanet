module.exports = (query) => {
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
};
