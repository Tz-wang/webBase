const WebSocket = require('ws');

const ws = new WebSocket.Server({port: 1111});  // 创建一个 websocket 服务器

ws.on('connection', function (ws) { // 每当有一个用户接入时，会进入connection的回调函数
    console.log('server: receive connection');
    ws.send('hello world')
    ws.on('message', function (msg) {   // 设置监听message事件，当有消息传入时，触发message的回调函数
        console.log(`message: ${msg}`);
        broadcase(msg); // 使用分发函数将数据分发出去
    })
})

/**
 * 分发函数，用于将消息发送给所有连接进websocket的客户端
 * 
*/
function broadcase(data) {
    ws.clients // <-- 这是所有连接进websocket的客户端集合
      .forEach(function (clients) {
        clients.send(data);
    })
}
