

function main(data){
	for(var i = 0;i<10;i++)
		console.log('asdf')
		
	console.log(data.split('\n'));
	return data;
	
}

//The input file that you want to run through... 
//This will auto update if you say yes in the browser.
main.input  =   './L.large.put'
module.exports	=	main;