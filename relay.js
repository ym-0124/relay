var sys = require('sys');
var ws = require('websocket-server');
var server = ws.createServer();
var relay = new (require('websocket-client').WebSocket)('ws://localhost:8000');

var Parameter = {
    pack: function(json){
	return JSON.stringify(json);
    },
    unpack: function(str){
	return JSON.parse(str);
    }
};

server.addListener("connection", function(connection){
	sys.debug("client connected: " + connection.id);

	connection.addListener("message", function(message){
		sys.debug(connection.id + " says: " + message);

		var m = Parameter.pack({"client_id":connection.id, "message":message});
		server.broadcast(m);
		relay.send(m);
	    });
    });

relay.onmessage = function(buffer){
    sys.debug(buffer.data);
    server.broadcast(buffer.data);
}

server.listen(8001);