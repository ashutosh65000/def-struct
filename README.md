<p align="center"> <img src=https://devicon.dev/devicon.git/icons/npm/npm-original-wordmark.svg alt=npm width="80" height="80"/> </p>

# def-struct
![Size](https://img.shields.io/badge/size-17.3kb-green) ![License](https://img.shields.io/badge/license-MIT-red) ![GitHub package.json version](https://img.shields.io/badge/Github%20version-1.0.3-blue) ![npm version](https://img.shields.io/badge/npm%20version-1.0.3-blue)

This is a NPM package to render a new pre-configures app for building REST API's via the terminal. [Download](https://www.npmjs.com/package/def-struct)

## Installation

install the npm package globally with following command.

```bash
npm i -g def-struct
```

## Usage

Execute the following command in the directory where you want to scaffold the node REST API project.

```bash
npx def-struct
```
Answer the few basic questions and then you are ready to go!!!

```bash
? Provide a Project name # default - name of working directory
? Provide project version # default - 1.0.0
? Provide project description
? Enter authors name
? Choose a Package Manager # [NPM or Yarn]
? Want to initialize empty git
? Want dotenv module? 
? Choose the database module # [MongoDB, Mongoose or None]
? Initialise Prettier or EsLint?
? Want to initialize the linter?
```

## Test the created application

```bash
nodemon server.js
```
---
**NOTE**
- Default port for the application configured is 8080, so make sure the port is not busy.
- To edit the port edit LISTENER_PORT in .env file.
- Before executing this command on terminal make sure to provide the MongoDB connection URL (if choosen).
- The DB_URL and DB_NAME in the .env file corresponds to MongoDB URL and Database name respectively.
---



## Installed dependencies

### Default Dependencies provided

- express
- body-parser
- morgan
- cors

### Optinal Dependencies

- dotenv
- mongoose
- mongoDB

### Default devDependencies

- nodemon

## Folder structure

```bash
.
├── middlewares
    └── middleware.js
├── models
├── node_modules
├── routes
    └── helloworld.js
├── .env
├── .eslintrc.json
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── prettier.config.js
└── server.js
```

## Content of the files

### server.js

```javascript
const express = require("express");
const bodyParser=require("body-parser");
const morgan=require("morgan");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//require Routes
const helloworld = require("./routes/helloworld");

app.use("/", helloworld);

app.listen(process.env.LISTENER_PORT, err=>{
    if(err){
        console.log(err);
    } else {
        console.log("Successfully started on port ",process.env.LISTENER_PORT);
    }
});
```

### prettier.config.js

```javascript
module.exports = {
    tabWidth: 1,
    semi: true,
    singleQuote: true,
    trailingComma: 'es5',
};
```

### .eslintrc.json

```json
{
    "env": {
        "node": true,
        "commonjs": true,
        "es2020": true
    },
    "extends": ["plugin:prettier/recommended", "airbnb-base"],
    "parserOptions": {
        "ecmaVersion": 11
    },
    "rules": {
        "prettier/prettier": "error"
    },
    "plugins": ["prettier"]
}
```

### helloworld.js

```javascript
const router=require("express").Router();
const path = require("path");

router.get('/',function(req,res){
    res.sendFile(path.join(path.dirname(__dirname) + "/index.html"));
});

module.exports = router;
```

## Contributing
Contributions are welcome. We accept contributions via Pull Requests. :smile:

## ⚖ License
Copyright 2020 Ashutosh Srivastava. Licensed under the [MIT License](https://choosealicense.com/licenses/mit/)
