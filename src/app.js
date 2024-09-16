/**
 * a plain old node api, using express
*/
const express = require('express');

const app = express();
app.use(express.json());

// api types
const restfulApi = require('./apiTypes/restful/index.js');
const graphQLApi = require('./apiTypes/graphQL/index.js');
const socketApi = require('./apiTypes/webSockets/index.js');

// Deliberately avoid 3000, as is used by local react dev app
const config = {
    restful: {
        port: process.env.port || 3000
    },
    graphQL: {
        port: process.env.port || 4000
    },
    webSocket: {
        port: procces.env.port || 5000
    }
}

const PORT = process.env.port || 3000;

try {
    restfulApi(app, config.restful);
    graphQLApi(app, config.graphQL);
} catch (e) {
    console.log(`Eerror starting app:\n${e}`);
}