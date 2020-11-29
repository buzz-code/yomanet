const axios = require("axios").default;
const qs = require("qs");

const yemotUrl = (isPrivate) =>
    isPrivate ? "https://private.call2all.co.il/ym/api/" : "https://www.call2all.co.il/ym/api/";

const doYemotAction = async (username, password, isPrivateYemot, action, params, config) => {
    params.token = `${username}:${password}`;
    const data = qs.stringify(params);
    const res = await axios.get(yemotUrl(isPrivateYemot) + action + "?" + data, {
        maxContentLength: Infinity,
        ...config,
    });
    console.log(res.config.url, res.data)
    return res;
};

module.exports = { doYemotAction };
