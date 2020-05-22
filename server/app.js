var express = require('express');
var app=express();
var http=require('http');
var server= http.createServer(app);
var io = require('socket.io').listen(server);


io.on('connection',(socket)=>{
    console.log('Socket Started');
    socket.on('new_member',(data)=>{
        console.log(data);
    socket.join(data.room);
    socket.in(data.room).broadcast.emit('server_new_member',{
        msg:data.name+ ' successfully joined room '+data.room,
        user:data.name,
        date:new Date()
    });
    });

    socket.on('new_msg',(data)=>{
        socket.in(data.room).broadcast.emit('server_new_msg',{
        msg:data.msg,
        user:data.name,
        date:new Date()
              });
        });
});






server.listen(3000,()=>{
    console.log('Server Starts')
});
