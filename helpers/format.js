const moment = require("moment");

const getSec2Min = (duration) => {
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = [];
    if (hrs > 0) {
        ret.push(hrs);
        ret.push(":");
    }
    if (mins < 10) {
        ret.push("0");
    }
    ret.push(mins);
    ret.push(":");
    if (secs < 10) {
        ret.push("0");
    }
    ret.push(secs);
    return ret.join("");
};

const getTableCellValue = (item, header) => {
    try {
        if (header.format === "sec2min") {
            const duration = item[header.value];
            return getSec2Min(duration);
        }
        if (header.format === "date") {
            return moment.utc(item[header.value]).format("DD/MM/YYYY");
        }
        if (header.format === "time") {
            return moment.utc(item[header.value]).format("HH:mm:ss");
        }
        if (header.format === "datetime") {
            return moment.utc(item[header.value]).format("DD/MM/YYYY HH:mm:ss");
        }
        if (header.format === "nameWOKlass") {
            const regex = /\d(.*)$/;
            if (regex.test(item[header.value])) {
                return item[header.value].match(regex)[1];
            }
        }
        if (header.format === "array") {
            return item[header.value] && item[header.value].join(", ");
        }
    } catch (e) {
        console.log("getTableCellValue format error", JSON.stringify(item[header.value]), header.format, e);
        return item[header.value];
    }
    return item[header.value] || "";
};

module.exports = {
    getSec2Min,
    getTableCellValue,
};
