module.exports = {
    apps: [
        {
            name: "yomanet",
            script: "./index.js",
            watch: true,
            env: {
                NODE_ENV: "production",
                MONGO_URI: "localhost:27017",
            },
        },
    ],
};
