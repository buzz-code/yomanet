const constants = require("./constants");

const normalizeListening = (data) => {
    return data;
};

const getTableCellValue = (item, header) => {
    if (header.format === "sec2min") {
        const duration = item[header.value];
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
    }
    return item[header.value];
};

const getTableDataResponse = (results, totalCount, headers, params) => {
    results.forEach((item) => {
        headers.forEach((header) => {
            item[header.value] = getTableCellValue(item, header);
        });
    });

    const data = {
        results,
        pageCount: Math.ceil(totalCount / constants.pageSize),
        headers,
        params,
    };
    return data;
};

module.exports = {
    normalizeListening,
    getTableCellValue,
    getTableDataResponse,
};
