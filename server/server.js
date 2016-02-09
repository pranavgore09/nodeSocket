var io = require('socket.io')(8181);
var room_brodcast = require('./room_broadcast');
room_brodcast.start(io);

function leave_india_room(){
	var sessions = io.sockets.adapter.rooms['india'];
	cnt = sessions ? sessions.length : 0
	message = {
		'total_connections': cnt
	};
	io.to('india').emit('message', message);
}

io.on('connection', function(socket){
	console.log('New Connection');
	socket.on('join', function(data){
		socket.join('india');
		var sessions = io.sockets.adapter.rooms['india'];
		cnt = sessions ? sessions.length : 0
		message = {
    		'total_connections': cnt
		};
		io.to('india').emit('message', message);
	});
	socket.on('disconnect', function(){
		console.log('Disconnected');
		leave_india_room();
	})
	socket.on('leave', function(data){
		socket.leave('india');
		leave_india_room();
	});
	socket.on('error', function(err){
		console.error(err);
	});
});
