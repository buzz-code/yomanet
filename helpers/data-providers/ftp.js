const ftp = require("basic-ftp");

const ftpUrls = {
    gis: "kol2.phonecall.co",
    "kol-kasher": "ftp.kolkasher.co.il",
};

const ftpPorts = {
    "kol-kasher": 64021,
}

const getFtpClient = async (provider, username, password) => {
    const client = new ftp.Client();
    await client.access({
        host: ftpUrls[provider],
        user: username,
        password: password,
        port: ftpPorts[provider],
    });
    return client;
};

module.exports = { getFtpClient };
