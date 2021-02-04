module.exports = {
    url: "/listening",
    yemotPath: "ivr2:Log/LogPlaybackPlayStop",
    yedaUrl: "https://yeda-phone.com/bsh/api/sfu-",
    dirRegex: /^nothing$/,
    fileRegex: /^((LogPlaybackPlayStop\.[\d]{4,4}-[\d][\d]-[\d][\d]\.ymgr)|([a-z]*\.[\d]*\.csv))|([א-ת\s]*[\d]{4,4}-[\d][\d]-[\d][\d].csv)|(דוח שיעורים נוות ישראל היסטוריה.csv)$/,
    fileType: "LogPlaybackPlayStop",
};
