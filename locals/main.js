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

socket.on('new',function(data){
    data.title; //  The file's filename
    data.data;  //  The real data inside the file
    $('fileName').innerHTML =   [
        '<strong>input file:</strong> ',
        data.title
    ].join('');
})





var EVENTS	=	{

	'file'	:	function(data){
		data.name;	//the filename
		data.data;	//the file data
		//HTML uses <br> instead of \n
		data.data	=	data.data.replace(/\n/g,'<br>');
		
		$('inputData').innerHTML	=	[
			data.data
		].join('');
    $('fileName').innerHTML =   [
        '<strong>input file:</strong> ',
        data.title
    ].join('');
		
	}










}


for(var event in EVENTS){
	socket.on(event,EVENTS[event]);
}













