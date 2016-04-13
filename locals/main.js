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
		
		//Replace the innerHTML
		$('inputData').innerHTML	=	[
			data.data
		].join('');
    $('fileName').innerHTML =   [
        '<strong>input file:</strong> ',
        data.title
    ].join('');
		
	},
	'change'	:	function(data){
		//HTML uses <br> instead of \n
		data.data	=	data.data.replace(/\n/g,'<br>');
		
		//Replace the innerHTML
		$('inputData').innerHTML	=	[
			data.data
		].join('');
	},
	'new'	:	function(data){
		swal({
			title: "New File Detected!",
			text: "Do you want to make this the new input file?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, this is mah input file",
			closeOnConfirm: false 
		},function(){   
			
		});
	}








}


for(var event in EVENTS){
	socket.on(event,EVENTS[event]);
}













