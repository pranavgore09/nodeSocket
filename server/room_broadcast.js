var io = undefined
function get_time_str(){
	var date = new Date();
	var hour = date.getHours();
	var min  = date.getMinutes();
	var sec  = date.getSeconds();
	return hour + ":" + min + ":" + sec;
}
function broadcasting_to_india(){
	console.log("pushing data")
	io.to('india').emit('message', {'data': 'Awesome ' + get_time_str()})
}

exports.start = function (_io) {
	console.log("ok ok ok =", typeof(io));
	io = _io;
	setInterval(broadcasting_to_india, 2000);
}
