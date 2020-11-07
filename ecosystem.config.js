module.exports = {
    apps: [
        {
            name: "yomanet",
            script: "./index.js",
            watch: true,
            env: {
                NODE_ENV: "production",
                MONGO_URI: "mongodb://USERNAME:PASSWORD@localhost:PORT/vocal?authSource=admin",
            },
            instances: "max",
            exec_mode: "cluster",
        },
    ],
};
