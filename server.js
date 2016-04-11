var Server	=	require('http').createServer(Handle);
var io	=	require('socket.io')(Server);
var fs	=	require('fs');
var chokidar	=	require('chokidar');
var GET	=	{};

//A little handler for this server

function Handle(req,res){
	req.url	=	req.url.trim();
	if(GET[req.url]){
		GET[req.url](req,res);
	}else{
		res.writeHead(404);
		res.end("Can't find it...")
	}
}


//Our routes
GET['/']	=	function(req,res){

	return fs.readFile(__dirname+"/locals/index.html",function(err,data){
		//If there's an error, send a 500
		if(err){
			res.writeHead(500);
			return res.end("Uh oh.. Something went wrong:  "+err);
		}

		res.writeHead(200);
		res.end(data);
	});	
	
}














Server.listen(1997);