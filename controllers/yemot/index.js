// // יצירת הקובץ
// $File = new oFile('ext.ini', 'text/plain', 'type=menu');
// //בדוגמא הזו יצרנו קובץ בשם ext.ini
// //שהתוכן שלו הוא הגדרה לשלוחת תפריט
// //הקובץ נשמר כאובייקט בתוך המשתנה $file

//  //כעת נגדיר פרמטרים נוספים שנצטרך לשדר
// $body = array
// (
// 'path' => 'ivr/1/ext.ini',//הנתיב המלא לאן הקובץ אמור לעלות
// 'convertAudio' => 0,//מפני שמדובר בקובץ טקסט שאינו זקוק להמרה נגדיר 0
// 'fileUpload' => $File//זה הקובץ שיצרנו קודם
// );

//  //עכשיו נפעיל את מתודת ההתחברות לAPI של האובייקט $con שיצרנו בהתחלה

// $a = $con -> connecting('UploadFile', $body);

// //כדי לבדוק בשלב הניסוי מה היתה התשובה שהתקבלה מימות המשיח נוסיף את השורה הבאה
// print_r ($con) ;
// //בדרך כלל בשלב המעשי נמחוק את השורה הנ"ל

// //קבלת תוכן של קובץ ini
// ws=YDDownloadIniFile

// what
// //נתיב הקובץ

// //העלאת קובץ ini
// ?ws=YDUploadIniFile',
//                data: {
//                   what: what,
//                   contents: contents
//                },

// //קבלת רשימת השלוחות
// ?ws=YDGetIVR2Extension',
//          data: {
//             path: destination,
//             filesFrom: 0,
//             filesLimit: 20,
//             orderBy: 'name',
//             orderDir: 'desc'

// //הזרמת אודיו של קובץ לדפדפן
// 'dl.php?what='+audio_file+'&dl=0&type=mp3';

// //מחיקת קובץ
// 'ws.php?ws=YDFileAction&what='+path+'&action=delete',

// //עריכת נתונים בקובץ ini
// ws.php?ws=YDIVR2UpdateExtension',
//             dataType: 'json',
//             data: { "_path": 'ivr2:/EnterID', type: '' }

//  'ws.php?ws=YDIVR2UpdateExtension',
//             dataType: 'json',
//             data: { "_path": 'ivr2:/SaleProducts', type: '' }

// ws.php?ws=YDIVR2UpdateExtension',
//             dataType: 'json',
//             data: { "_path": path, type: type, title: description }

// //העתקה/הדבקה/שינוי שם
// type: "POST", url: 'ws.php?ws=YDFileAction',
//                         dataType: 'json',
//                         data: paste_data
// if(right_click_action == 'copy'){
//                         FileAction = 'copy';
//                      }else if(right_click_action == 'move'){
//                         FileAction = 'move';
//                      }

//                      paste_data = {};

//                      if(multy_selection){

//                         paste_data = multy_data ;

//                      }
//                      else{

//                         paste_data.what = coppied_element_fullPath ;
//                      }

//                      paste_data.action = FileAction ;

//                      paste_data.target = rightClicked_element_fullPath ;

// //רשימת האפשרויות למיון רשימת הקבצים והשלוחות
// switch($(this).attr('id')) {
//     case 'ob_date_made':
//      //execute code block 1
//       order_by = 'date';
//      break;
//     case 'ob_last_changed':
//      //execute code block 2
//       order_by = 'mtime';
//      break;
//     case 'ob_name':
//      //execute code block 2
//      order_by = 'name';
//      break;
//      case 'ob_user':
//      //execute code block 2
//      order_by = 'uploader';
//      break;
//      case 'ob_size':
//      //execute code block 2
//      order_by = 'size';
//      break;
//      case 'ob_customer_number':
//      //execute code block 2
//      order_by = 'customerdid';
//      break;
//      case 'ob_source':
//      //execute code block 2
//      order_by = 'source';
//      break;
//     default:
//     // code to be executed if n is different from case 1 and 2
//     order_by = 'name';
//    }

// //הפעלת קמפיין
// //run_data מכיל את מספר התבנית templateid=*******
// .php?ws=YDRunCampaign',{
//                         type: 'POST',
//                         data: run_data,

const axios = require("axios").default;
const qs = require("qs");
const FormData = require("form-data");

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

        let data;

        if (method === "DownloadFile") {
            options.headers = { "Content-Type": "application/x-www-form-urlencoded" };
            options.responseType = options.responseType || "arraybuffer";

            data = qs.stringify(parameters);
        } else if (method === "UploadFile") {
            const form = new FormData();

            for (const parameter of Object.entries(parameters)) {
                if (typeof parameter[1] == "object") {
                    form.append(parameter[0], parameter[1].value, parameter[1].options);
                } else {
                    form.append(parameter[0], parameter[1]);
                }
            }

            options.headers = form.getHeaders();

            data = form.getBuffer();
        } else {
            options.headers = { "Content-Type": "application/x-www-form-urlencoded" };

            data = qs.stringify(parameters);
        }

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

// function getRequestOptions(params, token) {
//     const options = {
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     };
//     // if (token) {
//     //     options.headers["Cookie"] = token;
//     // }
//     const data = qs.stringify(params);

//     return {
//         options,
//         data,
//     };
// }

// async function login(user, password) {
//     const params = { user, password };
//     const { data, options } = getRequestOptions(params);
//     let res = await axios.post("https://www.call2all.co.il/ym/login.php", data, options);
//     // if (res.data && res.data.responseStatus !== "OK") {
//     //     throw res.data.responseStatus + ": " + res.data.message;
//     // }

//     // return res.data.token;
//     return res.headers["set-cookie"];
// }

// async function getListOfLogFiles(cookie) {
//     // // Cookie: PHPSESSID= token
//     // // const params = { token, path: "/", filesFrom: 0, filesLimit: 20, orderBy: "name", orderDir: "desc" };
//     // // const { data, options } = getRequestOptions(params, token);
//     // // let res = await yemot_con.post("/api/YDGetIVR2Extension", data, options);
//     // // if (res.data && res.data.responseStatus !== "OK") {
//     // //     throw res.data.responseStatus + ": " + res.data.message;
//     // // }

//     // // return res.data.token;
//     // let res = await axios.get(
//     //     "https://www.call2all.co.il/ym/ws.php?ws=YDGetIVR2Extension&path=%2F&filesFrom=0&filesLimit=20&orderBy=name&orderDir=desc",
//     //     { headers: { Cookie: cookie } }
//     // );
//     // return res;

//     return axios("https://www.call2all.co.il/ym/ws.php?ws=YDGetIVR2Extension", {
//         headers: {
//             //   "accept": "application/json, text/javascript, */*; q=0.01",
//             //   "accept-language": "he,en-US;q=0.9,en;q=0.8",
//             "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//             //   "sec-ch-ua": "\"Chromium\";v=\"86\", \"\\\"Not\\\\A;Brand\";v=\"99\", \"Google Chrome\";v=\"86\"",
//             //   "sec-ch-ua-mobile": "?0",
//             //   "sec-fetch-dest": "empty",
//             //   "sec-fetch-mode": "cors",
//             //   "sec-fetch-site": "same-origin",
//             //   "x-requested-with": "XMLHttpRequest",
// 			// cookie: 'PHPSESSID=p0m5akssc6qbroaiv0dpkm5jq1;',
// 			cookie: 'PHPSESSID=8b3asjhi2jqa6i8hr33j2mr476;',
//         },
//         // "referrer": "https://www.call2all.co.il/ym/index.php?view=ivr2",
//         // "referrerPolicy": "strict-origin-when-cross-origin",
//         data: "path=%2F&filesFrom=0&filesLimit=20&orderBy=name&orderDir=desc",
//         method: "POST",
//         // "mode": "cors"
//     });
// }

// login("033069265", "7525")
// .then(getListOfLogFiles)
// .then(console.log).catch(console.log);

const username = "033069265";
const password = "7525";
const token = 'yjPJvwmrUKTwdOYH'

async function doAction(method, parameters = {}, options = {}) {
    data = qs.stringify(parameters);
    options.headers = { "Content-Type": "application/x-www-form-urlencoded" };

    try {
        let res = await yemot_con.post("/" + method, data, options);

        if (
            res.data.responseStatus &&
            res.data.responseStatus === "EXCEPTION" &&
            res.data.message === "IllegalStateException(session token is invalid)"
        ) {
            await doAction("Login", username, password);

            return await doAction(method, parameters, options);
        }

        return res;
    } catch (error) {
        if (error.response) {
            if (error.response.status == 404) {
                throw error.response.data;
            } else if (error.response.data == "Exception IllegalStateException (session is expired) thrown") {
                await doAction("Login", username, password);

                return await doAction(method, parameters, options);
            }
        } else {
            throw error;
        }
    }
}

doAction("Login", { username, password }).then(console.log);
