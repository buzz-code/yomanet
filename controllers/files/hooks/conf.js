const { YemotConfBridge } = require("../../../models/YemotConfBridge");

module.exports = {
    url: "/conf",
    yemotPath: "ivr2:Log/LogConfBridgeEnterExit",
    dirRegex: /^[\d][\d][\d][\d]-[\d][\d]-[\d][\d]$/,
    fileRegex: /^((LogConfBridgeEnterExit\.[\d][\d][\d][\d]-[\d][\d]-[\d][\d]\.ymgr)|[a-z]*\.[\d]*\.csv)$/,
    fileType: "LogConfBridgeEnterExit",
};
