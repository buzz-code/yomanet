const { YemotConfBridge } = require("../../../models/YemotConfBridge");

module.exports = {
    url: "/conf",
    yemotPath: "ivr2:Log/LogConfBridgeEnterExit",
    dirRegex: /^[\d][\d][\d][\d]-[\d][\d]-[\d][\d]$/,
    fileRegex: /^((LogConfBridgeEnterExit\.[\d][\d][\d][\d]-[\d][\d]-[\d][\d]\.ymgr)|[\d]*\.csv)$/,
    fileType: "LogConfBridgeEnterExit",
};
