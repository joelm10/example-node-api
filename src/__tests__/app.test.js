const express = require('express');
let restfulApi = require('../services/apiTypes/restful/index.js');
let graphQLApi = require('../services/apiTypes/graphQL/index.js');
let socketApi = require('../services/apiTypes/webSockets/index.js');

// Mock dependencies
jest.mock('express', () => {
    const mockApp = {
        use: jest.fn(),
        listen: jest.fn(),
    };

    const express = () => mockApp;
    express.json = jest.fn(() => "json-middleware");
    express.urlencoded = jest.fn(() => "urlencoded-middleware");

    return express;
});

jest.mock('../services/apiTypes/restful/index.js', () => jest.fn());
jest.mock('../services/apiTypes/graphQL/index.js', () => jest.fn());
jest.mock('../services/apiTypes/webSockets/index.js', () => jest.fn());

describe('app.js', () => {
    let originalArgv;
    let originalConsoleLog;
    let originalConsoleError;
    let mockConsoleLog;
    let mockConsoleError;
    let mockExit;

    beforeEach(() => {
        // Save original process.argv and console methods
        originalArgv = process.argv;
        originalConsoleLog = console.log;
        originalConsoleError = console.error;

        // Mock console methods
        mockConsoleLog = jest.fn();
        mockConsoleError = jest.fn();
        console.log = mockConsoleLog;
        console.error = mockConsoleError;

        // Mock process.exit
        mockExit = jest.spyOn(process, 'exit').mockImplementation(() => { });

        // Reset mocks and module cache
        jest.clearAllMocks();
        jest.resetModules();
        // Re-import the modules AFTER resetting to get fresh mocks
        restfulApi = require('../services/apiTypes/restful/index.js');
        graphQLApi = require('../services/apiTypes/graphQL/index.js');
        socketApi = require('../services/apiTypes/webSockets/index.js');
    });

    afterEach(() => {
        // Restore original process.argv and console methods
        process.argv = originalArgv;
        console.log = originalConsoleLog;
        console.error = originalConsoleError;

        // Restore original process.exit
        mockExit.mockRestore();
    });

    test('should start restful API when cmd is "restful"', () => {
        process.argv = ['node', 'app.js', 'restful'];

        // Import app.js to execute it
        require('../app');

        expect(restfulApi).toHaveBeenCalledWith(
            {
                use: expect.any(Function),
                listen: expect.any(Function)
            },
            { port: expect.any(Number) }
        ); expect(mockConsoleLog).toHaveBeenCalledWith('Executing command: ', 'restful');
    });

    test('should start graphQL API when cmd is "graphql"', () => {
        process.argv = ['node', 'app.js', 'graphql'];

        // Import app.js to execute it
        require('../app');

        expect(graphQLApi).toHaveBeenCalledWith({
            use: expect.any(Function),
            listen: expect.any(Function)
        }, { port: expect.any(Number) });
        expect(mockConsoleLog).toHaveBeenCalledWith('Executing command: ', 'graphql');
    });

    test('should start socket API when cmd is "socket"', () => {
        process.argv = ['node', 'app.js', 'socket'];

        // Import app.js to execute it
        require('../app');

        expect(socketApi).toHaveBeenCalledWith({
            use: expect.any(Function),
            listen: expect.any(Function)
        }, { port: expect.any(Number) });
        expect(mockConsoleLog).toHaveBeenCalledWith('Executing command: ', 'socket');
    });

    test('should exit process when no valid command is provided', () => {
        process.argv = ['node', 'app.js', 'invalid'];

        // Import app.js to execute it
        require('../app');

        expect(mockConsoleError).toHaveBeenCalledWith('No server found');
        expect(mockExit).toHaveBeenCalledWith(1);
    });

    test('should handle error thrown during startup', () => {
        process.argv = ['node', 'app.js', 'restful'];

        // Mock implementation to throw an error
        restfulApi.mockImplementationOnce(() => {
            throw new Error('Test error');
        });

        // Import app.js to execute it
        require('../app');

        // First console.log call
        expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Executing command: ', 'restful');

        // Second console.log call (with exact error message format)
        // expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'error starting app:\nError: Test error');
    });
});