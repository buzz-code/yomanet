const ftp = require("basic-ftp");

const ftpUrls = {
    gis: "kol2.phonecall.co",
};

const getFtpClient = async (provider, username, password) => {
    const client = new ftp.Client();
    await client.access({
        host: ftpUrls[provider],
        user: username,
        password: password,
    });
    return client;
};

module.exports = { getFtpClient };
