const http = require('http');
const { Server } = require("socket.io");
const connectionHandlers = require('./common/connectionHandlers');


const socketApi = (app, config) => {
    const { port } = config;
    try {
        // STUB ONLY
        const server = http.createServer(app);
        const io = new Server(server);

        const healthCheckResp = {
            status: 200,
            ok: true,
            timestamp: Date.now()
        }

        app.get('/', (req, res) => {
            res.json(healthCheckResp);
        });
        app.get('/status', (req, res) => {
            res.json(healthCheckResp);
        });

        // Stub SocketIo connector
        io.on('connection', (socket) => {
            // TODO: Add connection logic
            connectionHandlers('connect', socket);

            socket.on('disconnect', (evt) => {
                connectionHandlers('disconnect', evt);
            });
        });

        server.listen(port, () => {
            console.log(`SocketIo: listening on *:${port}\n\n`);
        });

    } catch (e) {
        console.log(`socketApi errror:\n${e}`);
    }

};

module.exports = socketApi;