const { Listening } = require("../../models/Listening");

module.exports = {
    url: "/listening",
    yemotPath: "ivr2:Log/LogPlaybackPlayStop",
    model: Listening,
    fileRegex: /^LogPlaybackPlayStop\.[\d][\d][\d][\d]-[\d][\d]-[\d][\d]\.ymgr$/,
    map: function ({
        user,
        fileName,
        Folder,
        Current,
        Phone,
        IdType,
        EnterId,
        ValName,
        EnterHebrewDate,
        EnterDate,
        EnterTime,
        PositionPlay,
        PositionStop,
        ExitTime,
        TimeTotal,
    }) {
        return {
            user,
            fileName,
            extension: Folder,
            listening: Current,
            phone: Phone,
            identityType: IdType,
            identityNumber: EnterId,
            name: ValName,
            hebrew: EnterHebrewDate,
            date: EnterDate,
            startTime: EnterTime,
            endTime: ExitTime,
            startPoing: PositionPlay,
            endPoint: PositionStop,
            seconds: TimeTotal,
        };
    },
};
