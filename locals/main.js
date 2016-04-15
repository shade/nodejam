var socket  =   io();
var $   =   function(id){
    return document.getElementById(id)
}

socket.on('inputFile',function(data){
    data.title; //  The file's filename
    data.data;  //  The real data inside the file
    $('fileName').innerHTML =   [
        '<strong>input file:</strong> ',
        data.title
    ].join('');
})





var fileGoing	=	false;
var EVENTS	=	{

	'file'	:	function(data){
		data.name;	//the filename
		data.data;	//the file data
		
		//HTML uses <br> instead of \n
		data.data	=	data.data.replace(/\n/g,'<br>');
		
		//Replace the innerHTML
		$('inputData').innerHTML	=	[
			data.data
		].join('');
    $('fileName').innerHTML =   [
        '<strong>input file:</strong> ',
        data.title
    ].join('');
		
	},
	'new'	:	function(data){
		$('outputData').innerHTML	=	"";
		fileGoing	=	true;
	},
	'done'	:	function(){
		fileGoing	=	false;
	},
	'output'	:	function(data){
		if(typeof data	== "object"){
			data	=	JSON.stringify(data);
			data	=	data.replace(/,/g,'<br>')
		}else{
			data	=	data.replace(/\r\n/g,'<br>');
		}
		$('outputData').innerHTML	+=	'<br>'+data;	
	},
	'console'	:	function(data){
		if(!fileGoing)
			return;
		if(typeof data	== "object"){
			data	=	JSON.stringify(data);
			data	=	data.replace(/,/g,'<br> console: ')
		}else{
			data	=	"<br> console: "+data
		}
		$('outputData').innerHTML	+=	data;	
		
	}

}


for(var event in EVENTS){
	socket.on(event,EVENTS[event]);
}













