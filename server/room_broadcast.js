var io = undefined
var room_count = require('./get_room_count');

// Replace this function with anything you like
function get_time_str(){
	var date = new Date();
	var hour = date.getHours();
	var min  = date.getMinutes();
	var sec  = date.getSeconds();
	return hour + ":" + min + ":" + sec;
}

// Broadcasting to specific room if there are sessions in it.
function broadcasting_to_india(){
	if(room_count(io) > 0){
		console.log("pushing data")
		io.to('india').emit('message', {'data': 'Awesome ' + get_time_str()})
	}else{
		console.log("Empty room")
	}
}

// Start periodic event
exports.start = function (_io) {
	console.log("ok ok ok =", typeof(io));
	io = _io;
	setInterval(broadcasting_to_india, 3000);
}
