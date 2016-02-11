function get_room_count(io){
	var sessions = io.sockets.adapter.rooms['india'];
	cnt = sessions ? sessions.length : 0
	return cnt
}
module.exports = get_room_count
