module.exports = {

    // --------------------------------------~~ Basic Paths ~~----------------------------------- //

    appListen: ["..", "data", "basic", "appListener.txt"],

    gitSrc: ["data", "basic", "gitignore.txt"],
    gitDest: [".gitignore"],

    dotenvSrc: ["data", "basic", "env.txt"],
    dotenvDest: [".env"],

    // ------------------------------------------------------------------------------------------ //


    // --------------------------------------~~ JS Paths ~~-------------------------------------- //
    jsIndexSrc: ["data", "JS", "server.txt"],
    jsIndexDest: ["server.js"],

    jsRouterSrc: ["data", "JS", "helloworld.txt"],
    jsRouterDest: ["routes", "helloworld.js"],

    htmlSrc: ["data", "HTML", "index.txt"],
    htmlDest: ["index.html"],

    jsMiddlewareSrc: ["data", "JS", "middleware.txt"],
    jsMiddlewareDest: ["middlewares", "middleware.js"],

    jsPackageJsonSrc: ["data", "JS", "package.txt"],
    jsPackageJsonDest: ["package.json"],

    jsEslintSrc: ["data", "JS", "eslintrc.txt"],
    jsEslintDest: [".eslintrc.json"],

    jsPritterSrc: ["data", "JS", "prettier.txt"],
    jsPritterDest: ["prettier.config.js"],

    // ------------------------------------------------------------------------------------------ //


    // ----------------------------------~~ JS Snippets Paths ~~--------------------------------- //

    requireDotenv: ["..", "data", "JS", "snippets", "requireDotenv.txt"],

    requireMongoose: ["..", "data", "JS", "snippets", "requireMongoose.txt"],
    requireMongodb: ["..", "data", "JS", "snippets", "requireMongodb.txt"],

    jsMongooseConnect: ["..", "data", "JS", "snippets", "mongooseConnect.txt"],
    jsMongodbConnect: ["..", "data", "JS", "snippets", "mongodbConnect.txt"],

    // ------------------------------------------------------------------------------------------ //
};