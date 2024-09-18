/**
 * a plain old node api, using express
*/
const express = require('express');

const app = express();
app.use(express.json());

// api types
const restfulApi = require('./services/apiTypes/restful/index.js');
const graphQLApi = require('./services/apiTypes/graphQL/index.js');
const socketApi = require('./services/apiTypes/webSockets/index.js');

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
const cmd = process.argv[2];
console.log('Executing command: ', cmd);
try {
    if (cmd === 'restful') {
        restfulApi(app, config.restful);
    } else if (cmd === 'graphql') {
        graphQLApi(app, config.graphQL);

    } else if (cmd === 'socket') {
        socketApi(app, config.webSocket);
    } else {
        console.error('No server found');
        process.exit(1);
    }

} catch (e) {
    console.log(`error starting app:\n${e}`);
    console.trace();
}