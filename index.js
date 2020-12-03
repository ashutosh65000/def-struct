const terminal = require("inquirer");
const terminalQues = require("./src/terminalQuestions");

terminalQues().then(async (answers) => {
    const { pkgManager, git, dotenv, database, linter, acceptance } = answers;
    if (!acceptance) 
        return
})
