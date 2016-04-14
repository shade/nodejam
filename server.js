var Server	=	require('http').createServer(Handle);
var io	=	require('socket.io')(Server);
var fs	=	require('fs');
var chokidar	=	require('chokidar');

var GET	=	{};
var Sockets	=	{};
var Input	=	{};
var Ouput	=	"";


//A little handler for this server

function Handle(req,res){
	console.log(req.url)
	req.url	=	req.url.trim().toLowerCase();
	if(GET[req.url]){
		GET[req.url](req,res);
	}else{
		res.writeHead(404);
		res.end("Can't find it...")
	}
}


//Our routes
GET['/main.js']	=	GET['/play.png']	=	GET['/']	=	function(req,res){
	if(req.url	=== '/')
		req.url	=	'index.html'
	return fs.readFile(__dirname+"/locals/"+req.url,function(err,data){
		//If there's an error, send a 500
		if(err){
			res.writeHead(500);
			return res.end("Uh oh.. Something went wrong:  "+err);
		}

		res.writeHead(200);
		res.end(data);
	});	
	
}
io.on('connection',function(socket){
	Sockets[socket.id]	=	socket;
	socket.emit('file',Input);
	socket.emit('output',Ouput);
});



//Hijack the console.log
(function(){
    var oldLog = console.log;
    console.log = function (msg) {
			for(var id in Sockets){
				Sockets[id].emit('console',msg);
			}
        oldLog.apply(console, arguments);
    };
})();






(function main(){
	//Read the config file.
	var config	=	require('./config');

	//Load the input.. and store in input file
	Input	=	{
		name	:	config.inputFile,
		data	:	fs.readFileSync(config.inputFile).toString('ascii')
	};
	
	//Calculate an output
	try{
		var code	=	require(config.codeFile);
		Ouput	=	code(Input.data);
	}catch(e){
		console.log(e);
		Ouput	=	JSON.stringify(e);
	}
	
	//Watch for changes in the code, and update the output
	var codeFile	=	chokidar.watch(config.codeFile);
	codeFile.on('change',function(path){
		//delete the require for the input
		delete require.cache[require.resolve(config.codeFile)];
		try{
			var code	=	require(config.codeFile);
			Ouput	=	code(Input.data);
		}catch(e){
			console.log(e);
			Output	=	JSON.stringify(e);
		}
		//send the output to everyone
		for(var socket in Sockets){
			Sockets[socket].emit('output',Ouput);
		}
	});
	
	//Watch for changes in the input file, and update it
	var inputFile	=	chokidar.watch(config.inputFile);
	inputFile.on('change',function(paht){
		Input	=	{
			name	:	config.inputFile,
			data	:	fs.readFileSync(config.inputFile).toString('ascii')
		};
		//send the output to everyone
		for(var socket in Sockets){
			Sockets[socket].emit('input',Input);
		}
		
	});
	
})();



Server.listen(1997);