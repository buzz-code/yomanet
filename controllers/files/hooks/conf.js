module.exports = {
    url: "/conf",
    yemotPath: "ivr2:Log/LogConfBridgeEnterExit",
    yedaUrl: "https://yeda-phone.com/bsh/api/confbridge-",
    dirRegex: /^[\d][\d][\d][\d]-[\d][\d]-[\d][\d]$/,
    fileRegex: /^((LogConfBridgeEnterExit\.[\d][\d][\d][\d]-[\d][\d]-[\d][\d]\.ymgr)|[a-z]*\.[\d]*\.csv)$/,
    fileType: "LogConfBridgeEnterExit",
};
