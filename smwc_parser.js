#!/usr/local/bin/node

/**
* @file smwc_parser.js
* @brief Parses the SMWC contest rules and submission thread pages.
* @author Anadian
* @copyright MITlicensetm(2019,Canosw)
*/

//Dependencies
	//Internal
	//Standard
	const FileSystem = require('fs');
	const Utility = require('util');
	//External
	const ParseJSON = require('parse-json');

//Constants
const FILENAME = 'smwc_parser.js';
const MODULE_NAME = 'SMWCParser';
var PROCESS_NAME = '';
if(require.main === module){
	PROCESS_NAME = 'smwc_parser';
} else{
	PROCESS_NAME = process.argv0;
}

//Functions

//Exports and Execution
if(require.main === module){
	var page1_data = FileSystem.readFileSync('CLDC2016_RulesSubmissions_Page1_trimmed.html', 'utf8');
	page1_data += FileSystem.readFileSync('CLDC2016_RulesSubmissions_Page2_Trimmed.html', 'utf8');
	//var page1_tree = Parse5.parse(page1_data, { sourceCodeLocation: true });
	////console.log(Utility.inspect(page1_tree, { colors: false, depth: null, maxArrayLength: null } ));
	//var entry_array = page1_data.match(/<div class="postcontainer postpadding">/g);
	//var number_of_entries = entry_array.length;
	var page1_entry_data_array = page1_data.split('</tr>');
	var length = page1_data.match(/<tr id="p\d+">/g).length;
	var entries = [  ];
	var match_result;
	for( var i = 1; i < length; i++){
		console.log(i);
		var entry = {
			submission: {
				id: '',
				author_id: '',
				author_username: '',
				post_created: '',
				last_edit: '',
				last_edit_author_id: '',
				last_edit_author_username: '',
				message_body: '',
				patch_file_name: '',
				smwc_user_since: ''
			},
			scores: {
				rank: null,
				nimono: {
					design: null,
					creativity: null,
					aesthetics: null,
					total: null,
					comment: ''
				},
				noivern: {
					design: null,
					creativity: null,
					aesthetics: null,
					total: null,
					comment: ''
				},
				impetus: {
					design: null,
					creativity: null,
					aesthetics: null,
					total: null,
					comment: ''
				},
				torchkas: {
					design: null,
					creativity: null,
					aesthetics: null,
					total: null,
					comment: ''
				},
				wakana: {
					design: null,
					creativity: null,
					aesthetics: null,
					total: null,
					comment: ''
				},
				average: {
					design: null,
					creativity: null,
					aesthetics: null,
					total: null,
					comment: ''
				}
			},
			video: {
				title: '',
				url: '',
				upload_time: '',
				duration: '',
				tags: '',
				submissions: [
					{
						submission_id: '',
						start_time: '',
						end_time: ''
					}
				],
				deaths: [ ],
				comments: [
					{
						time: '',
						comment: ''
					}
				]
			},
			stage: {
				themes: [ ],
				custom: {
					title_screen: null,
					transition_screen: null,
					player_sprite: null,
					enemies: null,
					tiles: null,
					hud: null,
					soundtrack: null,
					overworld: null
				},
				features: {
					asm: null,
					dragon_coins: null,
					athletic_course: null,
					puzzles: null,
					boss_fights: null,
					altered_game_states: null,
					gimmicks: null,
					text: null,
					multiple_checkpoints: null,
					quick_restart: null,
					life_farm: null,
					memes: null,
					secret_exit: null,
					yoshi: null,
					auto_scroller: null
				}
			}
		};
		match_result = page1_entry_data_array[i].match(/<tr id="(\w+)">/);
		if( match_result !== null ){
			//console.log(match_result);
			entry.submission.id = match_result[1];
		}
		match_result = page1_entry_data_array[i].match(/<a href="\/\?p=profile\&amp;id=(\d+)" style="color: [^;]*;" class="un">([^<]*)<\/a><br>/);
		if( match_result !== null ){
			//console.log(match_result);
			entry.submission.author_id = match_result[1];
			entry.submission.author_username = match_result[2];
		}
		match_result = page1_entry_data_array[i].match(/Since: <time datetime="([0-9T:-]*)">[^<]*<\/time>/);
		if( match_result !== null ){
			//console.log(match_result);
			entry.submission.smwc_user_since = match_result[1];
		}
		match_result = page1_entry_data_array[i].match(/Posted on <time datetime="([^"]*)">[^<]*<\/time>/);
		if( match_result !== null ){
			console.log(match_result);
			entry.submission.post_created = match_result[1];
		}
		match_result = page1_entry_data_array[i].match(/Last edited <time datetime="([^"]*)">[^<]*<\/time> by <a href="\/\?p=profile\&amp;id=(\d+)" style="color: [^"]*" class="un">([^<]*)<\/a>/);
		if( match_result !== null ){
			console.log(match_result);
			entry.submission.last_edit = match_result[1];
			entry.submission.last_edit_author_id = match_result[2];
			entry.submission.last_edit_author_username = match_result[3];
		}
//		match_result = page1_entry_data_array[i].match(/<li class="postinfo">Posted on <time datetime="([^"]*)">[^<]*<\/time> ?( \| <i>Last edited <time datetime="([^"]*)">[^<]*<\/time> by <a href="\/\?p=profile\&amp;id=(\d+)" style="color: [^"]*" class="un">([^<]*)<\/a>)?/);
//		if( match_result !== null ){
//			console.log(match_result);
//			entry.submission.post_created = match_result[1];
//			entry.submission.last_edit = match_result[3];
//			entry.submission.last_edit_author_id = match_result[4];
//			entry.submission.last_edit_author_username = match_result[5];
//		}
//		match_result = page1_entry_data_array[i].match(/<li class="postinfo">Posted on <time datetime="([^"]*)">[^<]*<\/time> ?( \| <i>Last edited <time datetime="([^"]*)">[^<]*<\/time> by <a href="\/\?p=profile\&amp;id=(\d+)" style="color: [^"]*" class="un">([^<]*)<\/a>)?/);
//		if( match_result !== null ){
//			console.log(match_result);
//			entry.submission.post_created = match_result[1];
//			entry.submission.last_edit = match_result[3];
//			entry.submission.last_edit_author_id = match_result[4];
//			entry.submission.last_edit_author_username = match_result[5];
//		}
		match_result = page1_entry_data_array[i].match(/\/[^.]*\.[ib]ps/);
		if( match_result !== null ){
			//console.log(match_result);
			entry.submission.patch_file_name = match_result[0];
		}
		entry.submission.message_body = page1_entry_data_array[i];
		console.log(entry);
		entries.push(entry);
	}
	console.log(entries);
	var results_data = FileSystem.readFileSync('results.json', 'utf8');
	var results = ParseJSON(results_data);
	for( var i = 0; i < entries.length; i++){
		for( var j = 0; j < 27; j++){
			console.log("%d %d %s %s", i, j, entries[i].submission.author_username, results.score_array[j][1]);
			if( entries[i].submission.author_username == results.score_array[j][1] ){
				entries[i].scores.rank = results.score_array[j][0];
				entries[i].scores.nimono.design = results.score_array[j][2];
				entries[i].scores.nimono.creativity = results.score_array[j][3];
				entries[i].scores.nimono.aesthetics = results.score_array[j][4];
				entries[i].scores.nimono.total = results.score_array[j][5];
				entries[i].scores.noivern.design = results.score_array[j][6];
				entries[i].scores.noivern.creativity = results.score_array[j][7];
				entries[i].scores.noivern.aesthetics = results.score_array[j][8];
				entries[i].scores.noivern.total = results.score_array[j][9];
				entries[i].scores.impetus.design = results.score_array[j][10];
				entries[i].scores.impetus.creativity = results.score_array[j][11];
				entries[i].scores.impetus.aesthetics = results.score_array[j][12];
				entries[i].scores.impetus.total = results.score_array[j][13];
				entries[i].scores.torchkas.design = results.score_array[j][14];
				entries[i].scores.torchkas.creativity = results.score_array[j][15];
				entries[i].scores.torchkas.aesthetics = results.score_array[j][16];
				entries[i].scores.torchkas.total = results.score_array[j][17];
				entries[i].scores.wakana.design = results.score_array[j][18];
				entries[i].scores.wakana.creativity = results.score_array[j][19];
				entries[i].scores.wakana.aesthetics = results.score_array[j][20];
				entries[i].scores.wakana.total = results.score_array[j][21];
//				entries[i].scores.average.design = results.score_array[j][22];
//				entries[i].scores.average.creativity = results.score_array[j][23];
//				entries[i].scores.average.aesthetics = results.score_array[j][24];
				entries[i].scores.average.total = results.score_array[j][22];
				j = 27;
			}
		}
	}
	var output_string = JSON.stringify(entries, null, '\t');
	FileSystem.writeFileSync('output_1.json', output_string, 'utf8');
} else{
	
}

