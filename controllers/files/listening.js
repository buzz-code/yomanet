const { YemotPlayback } = require("../../models/YemotPlayback");

module.exports = {
    url: "/listening",
    yemotPath: "ivr2:Log/LogPlaybackPlayStop",
    model: YemotPlayback,
    fileRegex: /^LogPlaybackPlayStop\.[\d][\d][\d][\d]-[\d][\d]-[\d][\d]\.ymgr$/,
};
