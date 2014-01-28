var sys = require('sys');
var ws = require('websocket-server');
var server = ws.createServer();

server.addListener("connection", function(connection){
	sys.puts("connection");
	connection.addListener("message", function(message){
		sys.puts(message);
		connection.broadcast(message);
	    });
    });

server.listen(8000);
