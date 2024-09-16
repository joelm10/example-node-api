const http = require('http');

const socketApi = (app, config) => {
  const { port } = config;
  try {
    // STUB ONLY
    const server = http.createServer(app);

    app.get('/', (req, res) => {
      res.send('<h1>Hello world from the socket</h1>');
    });

    server.listen(port, () => {
      console.log(`listening on *:${port}`);
    });

  } catch (e) {
    console.log(`socketApi errror:\n${e}`);
  }

};

module.exports = socketApi;