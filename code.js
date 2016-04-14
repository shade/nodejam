


function main(data){
	data	=	data.split('\n');
	var T	=	parseInt(data.shift());
	while(--T>0){
		FL	=	data.shift().split(' ').map(parseFloat);
		N	=	FL[0];
		M	=	FL[1];
		PATHS	=	[];
		NEW_PATHS	=	[]
		while(--N>0){
			path	=	data.shift().substr(1).split('/');
			PATHS.push(path);	
		}
		while(--M>0){
			path	=	data.shift().substr(1).split('/');
			NEW_PATHS.push(path);
		}	
		var fileTree	=	{};
		var objPtr	=	{};
		PATHS.forEach(function(path){
			fileTree[path[0]]	=	{};
			objPtr	=	fileTree[path[0]];
			
		});
		
		
		
		
	}
	
}

//The input file that you want to run through... 
//This will auto update if you say yes in the browser.
main.input  =   './L.large.put'
module.exports	=	main;