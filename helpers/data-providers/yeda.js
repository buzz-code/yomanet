const axios = require("axios").default;

const loginUrl = "https://yeda-phone.com/bsh/api/token-auth/";

const getYedaController = async (username, password) => {
    const { data } = await axios.post(loginUrl, { username, password });
    const { token } = data;

    return {
        listFiles: async function (url) {
            const { data } = await axios.get(`${url}dates`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return data;
        },
        downloadFile: async function (url, path) {
            return axios.get(`${url}list?date=${path}&format=json`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
        },
    };
};

module.exports = { getYedaController };
