const { YemotConfBridge } = require("../../models/YemotConfBridge");

module.exports = {
    url: "/conf",
    yemotPath: "ivr2:Log/LogConfBridgeEnterExit",
    model: YemotConfBridge,
    fileRegex: /^LogConfBridgeEnterExit\.[\d][\d][\d][\d]-[\d][\d]-[\d][\d]\.ymgr$/,
};
