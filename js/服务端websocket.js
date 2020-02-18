const WebSocket = require('ws');

const ws = new WebSocket.Server({port: 1111});
ws.on('connection', function (ws) {
    console.log('server: receive connection');
    ws.on('message', function (msg) {
        console.log(`message: ${msg}`);
    })
    ws.send('hello world')
})