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