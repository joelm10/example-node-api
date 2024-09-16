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
        port: process.env.port || 5001
    }
}

try {
    restfulApi(app, config.restful);
    graphQLApi(app, config.graphQL);
    socketApi(app, config.webSocket);
} catch (e) {
    console.log(`error starting app:\n${e}`);
    console.trace();
}