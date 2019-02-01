#!/usr/local/bin/node

/**
* @file average_scores.js
* @brief Add the score averages to the JSON file.
* @author Anadian
* @copyright 	Copyright 2019 Canosw
	Permission is hereby granted, free of charge, to any person obtaining a copy of this 
software and associated documentation files (the "Software"), to deal in the Software 
without restriction, including without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so, subject to the following 
conditions:
	The above copyright notice and this permission notice shall be included in all copies 
or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//Dependencies
	//Internal
	//Standard
	const FileSystem = require('fs');
	//External
	const ParseJSON = require('parse-json');

//Constants
const FILENAME = 'average_scores.js';
const MODULE_NAME = 'AverageScores';
var PROCESS_NAME = '';
if(require.main === module){
	PROCESS_NAME = 'average_scores';
} else{
	PROCESS_NAME = process.argv0;
}

//Functions

//Exports and Execution
if(require.main === module){
	var file_data = FileSystem.readFileSync('CLDC2016_data.json', 'utf8');
	var json_object = ParseJSON(file_data);
	for( var i = 0; i < json_object.entries.length; i++ ){
		json_object.entries[i].scores.average.design = (json_object.entries[i].scores.nimono.design + json_object.entries[i].scores.noivern.design + json_object.entries[i].scores.impetus.design + json_object.entries[i].scores.torchkas.design + json_object.entries[i].scores.wakana.design) / 5;
		json_object.entries[i].scores.average.creativity = (json_object.entries[i].scores.nimono.creativity + json_object.entries[i].scores.noivern.creativity + json_object.entries[i].scores.impetus.creativity + json_object.entries[i].scores.torchkas.creativity + json_object.entries[i].scores.wakana.creativity) / 5;
		json_object.entries[i].scores.average.aesthetics = (json_object.entries[i].scores.nimono.aesthetics + json_object.entries[i].scores.noivern.aesthetics + json_object.entries[i].scores.impetus.aesthetics + json_object.entries[i].scores.torchkas.aesthetics + json_object.entries[i].scores.wakana.aesthetics) / 5;
	}
	var output_string = JSON.stringify(json_object, null, '\t');
	FileSystem.writeFileSync('CLDC2016_data_with_averages.json', output_string, 'utf8');
} else{
	
}

