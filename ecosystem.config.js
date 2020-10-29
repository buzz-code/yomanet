module.exports = {
    apps: [
        {
            name: "yomanet",
            script: "./index.js",
            watch: true,
            env: {
                NODE_ENV: "production",
                MONGO_URI: "mongodb+srv://mongouser:1@127.0.0.1:27017/vocal",
            },
        },
    ],
};
