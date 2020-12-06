const path = require("path");
const fs = require("fs");
const editJsonFile = require("edit-json-file");
const insertLine = require("insert-line");
const ora = require("ora");
const { createDir, copyFile } = require("../utility");
const { eslintDependencies } = require("../dependencies");
const paths = require("../paths");

exports.copyingFiles = async (name) => {
    const loader = ora("Copying JS Files").start();
    await copyFile(name, paths.jsIndexSrc, paths.jsIndexDest);
    await copyFile(name, paths.jsRouterSrc, paths.jsRouterDest);
    await copyFile(name, paths.htmlSrc, paths.htmlDest);
    await copyFile(name, paths.jsMiddlewareSrc, paths.jsMiddlewareDest);
    
    loader.succeed("JS Files Copied");
};

exports.createPackageJson = async ({ name, version, description, author, dotenv, database, eslint }) => {

    const loader = ora("Creating file package.json.").start();

    await copyFile(name, paths.jsPackageJsonSrc, paths.jsPackageJsonDest);

    const file = editJsonFile(
        path.join(process.cwd(), name, "package.json")
    );
    file.set("name", name);
    file.set("version", version);
    file.set("description", description);
    file.set("author", author);

    // DOTENV DEPENDENCIES
    if (dotenv) {
        const dependencies = file.get("dependencies");
        dependencies.dotenv = "latest";
        file.set("dependencies", dependencies);
    }

    // ESLINT DEPENDENCIES
    if (eslint) {
        const devDependencies = file.get("devDependencies");
        file.set("devDependencies", { ...devDependencies, ...eslintDependencies });
    }

    // DATABASE DEPENDENCIES
    if (database === "mongoose") {
        const dependencies = file.get("dependencies");
        dependencies.mongoose = "latest";
        file.set("dependencies", dependencies);
    }
    if (database === "mongodb") {
        const dependencies = file.get("dependencies");
        dependencies.mongodb = "latest";
        dependencies.assert = "latest";
        file.set("dependencies", dependencies);
    }

    file.save(() => { });
    loader.succeed("File package.json created successfully.");
};

exports.copyingESLintFiles = async (name) => {
    const loader = ora("Creating eslint/pritter Config Files").start();
    await copyFile(name, paths.jsEslintSrc, paths.jsEslintDest);
    await copyFile(name, paths.jsPritterSrc, paths.jsPritterDest);
    loader.succeed("EsLint/Prettier configuration files created successfully.");
};

exports.copyingDotEnvFiles = async (name) => {
    const requireDotenv = fs.readFileSync(
        path.join(__dirname, "..", ...paths.requireDotenv)
    );
    insertLine(
        path.join(process.cwd(), name, ...paths.jsIndexDest)
    ).prependSync(requireDotenv);
    await copyFile(name, paths.dotenvSrc, paths.dotenvDest);
};

exports.addDB = (name, database) => {
    const mongoose = async () => {
        const requireMongoose = fs.readFileSync(
            path.join(__dirname, "..", ...paths.requireMongoose)
        );
        const mongooseConnect = fs.readFileSync(
            path.join(__dirname, "..", ...paths.jsMongooseConnect)
        );
        insertLine(
            path.join(process.cwd(), name, ...paths.jsIndexDest)
        ).prependSync(requireMongoose);
        insertLine(
            path.join(process.cwd(), name, ...paths.jsIndexDest)
        ).appendSync(mongooseConnect);
    };

    const mongodb = async () => {
        const requireMongodb = fs.readFileSync(
            path.join(__dirname, "..", ...paths.requireMongodb)
        );
        const mongodbConnect = fs.readFileSync(
            path.join(__dirname, "..", ...paths.jsMongodbConnect)
        );
        insertLine(
            path.join(process.cwd(), name, ...paths.jsIndexDest)
        ).prependSync(requireMongodb);
        insertLine(
            path.join(process.cwd(), name, ...paths.jsIndexDest)
        ).appendSync(mongodbConnect);
    };

    switch (database) {
        case "mongoose": mongoose();
            break;
        case "mongodb": mongodb();
    }

    createDir(path.join(name, "models"));
};