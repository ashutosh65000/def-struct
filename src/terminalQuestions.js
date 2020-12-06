const terminal = require("inquirer");
const path = require("path")

module.exports = async () => {
    const userValues = await terminal.prompt([
        // Question-1
        {
            name: "name",
            type: "input",
            message: "Provide a Project name",
            default: () => {
                return path.basename( path.dirname(__dirname));
            },
            validate: (input) => {
                if (!input) {
                    return "Enter the Project Name"
                }
                return true;
            }
        },
        // Question-2
        {
            name: "version",
            type: "input",
            message: "Provide project version",
            default: "1.0.0",
            validate: (input) => {
                const valid = /^(\*|\d+(\.\d+){2,2}(\.\*)?)$/.test(input) ? true : "Enter valid version";
                return valid;
            }
        },
        // Question-3
        {
            name: "description",
            type: "input",
            message: "Provide project description"
        },
        // Question-4
        {
            name: "author",
            type: "input",
            message: "Enter author's name"
        },
        // Question-5
        {
            name: "pkgManager",
            type: "list",
            message: "Choose a Package Manager",
            choices: ["NPM", "Yarn"],
            default: "NPM"
        },
        // Question-6
        {
            name: "git",
            type: "confirm",
            message: "Want to initialize empty git?"
        },
        // QUestion-7
        {
            name: "dotenv",
            type: "confirm",
            message: "Want dotenv module?"
        },
        // Question-8
        {
            name: "database",
            type: "list",
            message: "Choose the database module",
            choices: ["mongoose", "mongodb", "none"],
            default: "mongoose"
        },
        // Question-9
        {
            name: "eslint",
            type: "confirm",
            message: "Initialise Prettier or EsLint?"
          },
        // Question-10
        {
            name: "linter",
            type: "list",
            message: "Want to initialize the linter?",
            choices: ["eslint", "none"],
            default: "eslint"
        }
    ]);

    console.log(userValues);

    const acceptance = await terminal.prompt([
        {
            name: "acceptance",
            type: "confirm",
            message: "Is this OK?"
        },
    ]);

    return { ...userValues, ...acceptance };
};