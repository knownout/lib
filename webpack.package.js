const path = require("path");
const defaultConfig = require("./webpack.config.js");

const packageConfig = Object.assign(defaultConfig, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "package", "dist"),
        filename: "[name].js",
        library: {
            name: "lib",
            type: "umd"
        }
    },

    entry: {
        lib: path.resolve(__dirname, "package", "lib")
    },

    plugins: []
});

packageConfig.module.rules[1].use.options.configFile = "tsconfig.package.json";
module.exports = packageConfig;
