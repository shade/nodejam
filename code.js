var FileTree = {};
var mkDirCount = 0;
function treeWalk(paths,ptr,count){
	ptr = ptr || FileTree
	paths.forEach(function(v,i,a){
		if(v.length == 0)
			return;
		
		if(!ptr[v[0]]){
			count&&mkDirCount++;
			ptr[v[0]] = {};
		}
		//Take out the first one and walk it
		var newPath	=	v.shift();
		treeWalk([v],ptr[newPath],count);
	});
}



function main(data){
	data	=	data.split('\r\n');
	var T	=	parseInt(data.shift());
	var Steps	=	[]
	while(T--){
		FileTree = {};
		mkDirCount = 0;
		var FL =	data.shift().split(' ').map(parseFloat);
		var N = FL[0];
		var M = FL[1];
		var _paths = [];
		var _newPaths = [];
		
		while(N--){
			_paths.push(data.shift().substr(1).split('/'))	
		}
		
		while(M--){
			_newPaths.push(data.shift().substr(1).split('/'))	
		}
		treeWalk(_paths,FileTree,false)
		treeWalk(_newPaths,FileTree,true)
		Steps.push(mkDirCount);
	}
	
	Steps	=	Steps.map((step,i) => (
		['Case #',(i+1),': ',step].join('')
	))
	
	return Steps.join('\n');
}

//The input file that you want to run through... 
//This will auto update if you say yes in the browser.
main.input  =   './L.large.put'
module.exports	=	main;