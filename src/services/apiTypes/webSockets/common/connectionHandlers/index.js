const connectionHandlers = (context, event) => {
    // 
    if (context === 'connect') {
        console.log('a new connecction connected');

    } else if (context === 'disconnect') {
        console.log('a client connecction disconnected');
    }

};

module.exports = connectionHandlers;