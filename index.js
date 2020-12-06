#!/usr/bin/env node

const terminal = require("inquirer");
const terminalQues = require("./src/terminalQuestions");
const { structuringFolders, npmInstall, yarnInstall, gitInitialize, addListen, openVsCode } = require("./src/structuring/basicStructuring");
const { copyingFiles, createPackageJson, copyingESLintFiles, copyingDotEnvFiles, addDB } = require("./src/structuring/jsStructuring");

const jsSpecificInstallation = async (answers) => {
    const { name, eslint, dotenv, database } = answers;

    await createPackageJson(answers);

    await copyingFiles(name);

    if (eslint) {
        await copyingESLintFiles(name);
    }

    if (database !== "none") {
        addDB(name, database);
        addListen(name);
    } else {
        addListen(name);
    }

    if (dotenv) {
        await copyingDotEnvFiles(name);
    }
};

terminalQues().then(async (answers) => {
    const { name, pkgManager, git, dotenv, database, linter, acceptance } = answers;

    if (!acceptance) {
        return;
    }

    await structuringFolders(name);

    await jsSpecificInstallation(answers);

    if (pkgManager === "NPM") {
        await npmInstall(name);
    } else {
        await yarnInstall(name);
    }

    if (git) {
        await gitInitialize(name);
    }

    console.log("✔ Finished Structuring! 🎉✨");

    terminal.prompt([
        {
            name: "VsCode",
            type: "confirm",
            message: "Open project in VSCode?",
        },
    ]).then(({ VsCode }) => {
        if (VsCode) {
            openVsCode(name);
        }
    });
});
