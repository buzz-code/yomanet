const md5 = require("md5");
const { File } = require("../models/File");

const fileIsUnique = async (user, fileContent) => {
    // todo: validate file format
    const md5OfContent = md5(fileContent);
    const isExisting = await File.exists({ user: user.name, md5: md5OfContent });
    return {
        isValid: !isExisting,
        md5: md5OfContent,
    };
};

module.exports = {
    fileIsUnique,
};
