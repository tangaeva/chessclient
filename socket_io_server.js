var io = require('socket.io').listen(81);
var fs = require('fs');
var AloneRoom;

// Ћоги 
function Logs()
{
	var k = 0;
	for (var i in io.sockets.manager.rooms)
	{
		Log("- Sockets count in " + i + " room = " + io.sockets.manager.rooms[i].length + "\r\n");
		k++;
	}
	Log("- Rooms count = " + k + "\r\n");
}

Logs();

function Log(data)
{
	fs.appendFile('Logs.txt', data, function (err) 
	{
	  if (err) throw err;
	});
}

// тип connected, сообщение СЕТ
io.sockets.on('connection', function (socket) 
{
	socket.emit("connected");
	socket.gameStatus = "connected";
	
	Logs();

	Log("- " + socket.id + " is connected.\r\n");

	socket.on('readyToPlay', function() 
	{		
		if (socket.gameStatus != "connected") return;	
		
		// тип gameStarted, сообщение С Т 
		if (AloneRoom)
		{
			socket.join(AloneRoom);
			Log("- Room # " + AloneRoom + " is full.\r\n");
			io.sockets.in(AloneRoom).emit("gameStarted");		    

			for (var socketId in io.sockets.clients(AloneRoom)) 
			{
			    console.log(socketId);
			    console.log(io.sockets.clients(AloneRoom)[socketId].gameStatus);
			    io.sockets.clients(AloneRoom)[socketId].gameStatus = "gameStarted";
			    console.log(io.sockets.clients(AloneRoom)[socketId].gameStatus);
			    Log("- " + socketId + " game started.\r\n");
			}
			
			socket.room = AloneRoom;
			AloneRoom = undefined;
		}
		// тип waitingForPlayers, сообщение С Т 
		else
		{
			AloneRoom = socket.id;
			socket.join(AloneRoom);
			socket.room = AloneRoom;
			Log("- Room #" + AloneRoom + " has been created.\r\n");
			socket.emit("waitingForPlayers");
			socket.gameStatus = "waitingForPlayers";
		}
		Logs();
	});
	
	// тип makeMove, сообщение С{xfrom, yfrom ,xto, yto, newfigure}Т
	socket.on("makeMove", function (data) 
	{
	    Log(" - Make move called.\r\n");
		if (socket.gameStatus != "gameStarted")
		    return;

		Log("- Make move valid.\r\n");
		
		if (data.xfrom == undefined && data.yfrom == undefined && data.xto == undefined && data.yto == undefined) 
		{
		    this.disconnect();
		    Log("- Wrong coordinates from socket " + socket.id + " \r\n");
		    return;
		}
		
		var room = socket.room;
		var roomClients = io.sockets.clients(room);
		for (var sock in roomClients) 
		{
			if (socket.id != roomClients[sock].id) 
			{
				roomClients[sock].emit("makeMove", data);
				Log("- " + socket.id + " maked move from " + data.yfrom + " " + data.xfrom + " to " + data.yto + " " + data.xto + "\r\n");
	        }
        }		
	});
	
	socket.on("gameOver", function () //data
	{	
	    Log("- " + socket.id + " send 'game over'.\r\n");		
	    var room = socket.room;
		var roomClients = io.sockets.clients(room);
		for (var sock in roomClients) 
		{				            
			Log("- " + roomClients[sock].id + " disconnected.\r\n");
			roomClients[sock].disconnect();
			LogLog();
        }
	});
	
	// тип disconnect, сообщение С Т
	socket.once("disconnect", function () //data
	{
		Log("- Disconnect called by " + socket.id + "\r\n");	
		if (socket.gameStatus == "gameStarted")
		{
			var room = socket.room;
			var roomClients = io.sockets.clients(room);
			for (var sock in roomClients) 
			{
				if (socket.id != roomClients[sock].id) 
				{	            
					Log("- " + roomClients[sock].id + " disconnected.\r\n");
					roomClients[sock].disconnect();
					Logs();
				}
				else
				{
					socket.leave(room);
					Log("- Next\r\n");
					Logs();
				}
			}
		}
		else
		{
			socket.leave(room);
			Log("next\n");
			Logs();
		}
	});
});