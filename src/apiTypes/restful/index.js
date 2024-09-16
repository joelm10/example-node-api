const restfulApi = (app, config) => {
    const { port } = config;

    app.listen(port, () => {
        console.log(`Restful API listending on port ${port}`);
    });


    app.get('/status', (request, response) => {
        const status = {
            'Status': 'Running',
            status: 200
        };

        response.send(status);
    });
};

module.exports = restfulApi;