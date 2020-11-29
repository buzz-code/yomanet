const axios = require("axios").default;
const qs = require("qs");

const yemotUrl = (isPrivate) =>
    isPrivate ? "https://private.call2all.co.il/ym/api/" : "https://www.call2all.co.il/ym/api/";

const doYemotAction = async (username, password, isPrivateYemot, action, params, config) => {
    params.token = `${username}:${password}`;
    const data = qs.stringify(params);
    console.log(yemotUrl(isPrivateYemot) + action + '?' + data)
    const res = await axios.get(yemotUrl(isPrivateYemot) + action + "?" + data, {
        maxContentLength: Infinity,
        ...config,
    });
    return res;
};

module.exports = { doYemotAction };
