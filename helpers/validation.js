const md5 = require("md5");

const fileIsUnique = (fileContent) => {
    // todo: check that the file is unique
    // todo: validate file format
    return md5(fileContent).length > 0;
};

const login = (username, password) => {
    // todo:
    return true;
};

module.exports = {
    fileIsUnique,
    login,
};
