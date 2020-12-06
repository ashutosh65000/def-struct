const fs = require("fs");
const path = require("path");
const insertLine = require("insert-line");
const ora = require("ora");
const { exec } = require("node-exec-promise");
const { createDir, copyFile } = require('../utility');
const paths = require('../paths');

// Directory Scaffolding
exports.structuringFolders = async (name) => {
    const loader = ora("Creating Folders...").start();
    createDir(name);
    createDir(path.join(name, "routes"));
    createDir(path.join(name, "middlewares"));
    loader.succeed("Folders structuring successfull.");
};

// --------------------------------------~~ PACKAGE MANAGER ~~----------------------------------- //
// NPM
exports.npmInstall = async (name) => {
    const loader = ora("Installing NPM dependencies...").start();
    await exec(`cd ${name} && npm install`)
    loader.succeed("Installed NPM dependencies successfully.");
};

// Yarn
exports.yarnInstall = async (name) => {
    const loader = ora("Installing Yarn...").start();
    await exec(`cd ${name} && yarn install`)
    loader.succeed("Installed Yarn dependencies successfully.");
};

// Git
exports.gitInitialize = async (name) => {
    const spinner = ora("Initialising Empty Git Repository").start();
    await copyFile(name, paths.gitSrc, paths.gitDest);
    await exec(`cd ${name} && git init`);
    spinner.succeed("Empty git repository initialized successfully.");
};

// App Listener
exports.addListen = (name) => {
    const appListen = fs.readFileSync(
        path.join(__dirname, '..', ...paths.appListen)
        );
    const dest = paths.jsIndexDest;
    insertLine(
        path.join(process.cwd(), name, ...dest)
        ).appendSync(appListen);
};

// Open the Folder in IDE (Visual Code Studio)
exports.openVsCode = async (name) => {
    await exec(`cd ${name} && code .`);
};