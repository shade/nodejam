
function main(data){
	data	=	data.split('\n');
	var T	=	parseInt(data.shift());

	while(--T>0){
		FL	=	data.shift().split(' ').map(parseFloat);
		N	=	FL[0];
		M	=	FL[1];
		PATHS	=	[];
		
		while(--N>0){
			path	=	data.shift().substr(1).split('/');
			console.log(path);
			PATHS.push(path)
			
		}
	}
	return [];
}

//The input file that you want to run through... 
//This will auto update if you say yes in the browser.
main.input  =   './L.large.put'
module.exports	=	main;