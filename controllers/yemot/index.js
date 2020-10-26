const axios = require("axios").default;
const qs = require("qs");

const yemot_con = axios.create({
    baseURL: "https://www.call2all.co.il/ym/api/",
    maxContentLength: Infinity,
});

/**
 *
 * @constructor
 * @param {string} username
 * @param {string} password
 *
 */
function yemot_api(username, password) {
    let token;
    let is_connect = false;

    /**
     *
     * @param {string} method
     * @param {object} parameters
     * @param {AxiosRequestConfig} options
     *
     * @returns {promise}
     */
    async function exec(method, parameters = {}, options = {}) {
        if (!is_connect && method !== "Login") {
            await login();
        }

        if (method !== "Login") {
            parameters.token = token;
        }

        options.headers = { "Content-Type": "application/x-www-form-urlencoded" };
        const data = qs.stringify(parameters);

        try {
            let res = await yemot_con.post("/" + method, data, options);

            if (
                res.data.responseStatus &&
                res.data.responseStatus === "EXCEPTION" &&
                res.data.message === "IllegalStateException(session token is invalid)"
            ) {
                await login();

                return await exec(method, parameters, options);
            }

            return res;
        } catch (error) {
            if (error.response) {
                if (error.response.status == 404) {
                    throw error.response.data;
                } else if (error.response.data == "Exception IllegalStateException (session is expired) thrown") {
                    await login();

                    return await exec(method, parameters, options);
                }
            } else {
                throw error;
            }
        }
    }

    async function login() {
        const parm = { username, password };
        const res = await exec("Login", parm);

        if (res.data && res.data.responseStatus !== "OK") {
            throw res.data.responseStatus + ": " + res.data.message;
        }

        token = res.data.token;
        is_connect = true;
    }

    this.exec = exec;
}

module.exports = yemot_api;

// async function main() {
//     const controller = new yemot_api("033069265", "7525");
//     const res = await controller.exec("GetIVR2Dir", { path: "ivr2:Log/LogPlaybackPlayStop" });
//     console.log(res.data.html);
//     // const fileRes = await controller.exec("DownloadFile", { path: res.data.html[0].what });
//     // console.log(fileRes);
// }

// main().then(console.log);
