module.exports = {
    verbose: true,

    preset: "ts-jest",
    testEnvironment: "jsdom",

    testMatch: [
        "**/package/**/?(*.)(spec|test).ts?(x)"
    ],

    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json",
            diagnostics: false
        }
    }
};
