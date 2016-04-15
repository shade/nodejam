var Server	=	require('http').createServer(Handle);
var io	=	require('socket.io')(Server);
var fs	=	require('fs');
var chokidar	=	require('chokidar');
var Config	=	require('./config');

var Input	=	"";
var Output	=	"";
var GET	=	{};
var Sockets	=	{};
var Analyzing	=	false;

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

//Handle the sockets
io.on('connection',function(socket){
	Sockets[socket.id]	=	socket;
	socket.emit('file',{
		name : Config.inputFile,
		data : fs.readFileSync(Config.inputFile).toString('ascii')
	});
	socket.emit('output',Output);
	reCheck();
});

//Handle our console.log
(function(){
    var oldLog = console.log;
    console.log = function (message) {
			if(Analyzing){
        for(var id in Sockets){
					Sockets[id].emit('console',message);		
				}
			}
        oldLog.apply(console, arguments);
    };
})();


//Handle file changes
var Watchers	=	{
	input	:	chokidar.watch('./input.dat'),
	code	:	chokidar.watch('./code.js')
};

Watchers.input.on('change',function(){
	reCheck();
});
Watchers.code.on('change',function(){
	reCheck();
});






//The function to make sure everything works.
function reCheck(){
	
	//Tell everyone we're re-analyzing the code
	for(id in Sockets){
		Sockets[id].emit('new');
	}
	
	//So that console.log knows to record this.
	Analyzing	=	true;
	
	
	//Begin code re-analysis
	var _output	=	"";
	delete require.cache[require.resolve(Config.codeFile)];
	try{
		_output	=	require(Config.codeFile)(fs.readFileSync(Config.inputFile).toString('ascii'))
	}catch(err){
		console.log(err)
		_output	=	err;
	}
	
	//So console.log knows we're done
	Analyzing	=	false;
	
	//Tell everyone the results...
	for(id in Sockets){
		Sockets[id].emit('output',_output);
	}
	
	
	//Tell everyone we're done
	for(id in Sockets){
		Sockets[id].emit('done');
	}
}






//Start the server.
Server.listen(1997);