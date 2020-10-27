const yemotApi = require('./yemot')

async function main() {
    const yemot = new yemotApi("033069265", "7525");
    const { data } = await yemot.exec("GetIVR2Dir", { path: "ivr2:Log/LogPlaybackPlayStop" });
    console.log(data.html.map(item => ({ label: item.name, value: item.what })));
    // const file = await yemot.exec("DownloadFile", { path: files.data.html[0].what });
    // return file.data;
}

main().then(console.log)