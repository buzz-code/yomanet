module.exports = {
    apps: [
        {
            name: "yomanet",
            script: "./index.js",
            watch: true,
            env: {
                NODE_ENV: "production",
                MONGO_URI: "mongodb://127.0.0.1:27018/vocal?retryWrites=false",
            },
            instances: "max",
            exec_mode: "cluster",
        },
    ],
};
