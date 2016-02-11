var io = require('socket.io')(8181);
var room_brodcast = require('./room_broadcast');
var room_count = require('./get_room_count');
room_brodcast.start(io);

function leave_india_room(){
	message = {
		'total_connections': room_count(io)
	};
	io.to('india').emit('message', message);
}

io.on('connection', function(socket){
	console.log('New Connection');
	// JOIN event handling
	socket.on('join', function(data){
		socket.join('india');
		message = {
    		'total_connections': room_count(io)
		};
		io.to('india').emit('message', message);
	});
	// DISCONNECT event handling
	socket.on('disconnect', function(){
		console.log('Disconnected');
		leave_india_room();
	})
	// LEAVE event handling
	socket.on('leave', function(data){
		socket.leave('india');
		leave_india_room();
	});
	// ERROR event handling
	socket.on('error', function(err){
		console.error(err);
	});
});
