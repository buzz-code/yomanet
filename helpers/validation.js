const { File } = require("../models/File");

const fileIsUnique = async (user, md5) => {
    // todo: validate file format
    const isExisting = await File.exists({ user: user.name, md5 });
    return !isExisting;
};

module.exports = {
    fileIsUnique,
};
