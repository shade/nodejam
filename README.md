#NodeJam
###Making Codejam easier for people using Node.js

Hello JS programmers! After participating in Google's Codejam 2016 I decided that I'd make my own JS helper to help my write acceptable Nodejs code as well as speed up my answering process.

How to get started:
	
*	git clone this repository, or download it somewhere
*	do an npm install to install all the dependancies
*	run a npm start

code.js
```javascript

function main(data){
	//The data from your input file is fed in through the data parameter
	
	//Room for you to do your codejam thing.
	var answer = [
		'Case #0: '+data.length,
		'Case #1: '+data.length
	].join('\n');
	
	
	
	//Return the formatted final data;
	return answer;
}



module.exports = main;
```