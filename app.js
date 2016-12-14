/*
* @Author: Amanpreet Singh
* @Email : Amanpreet.dev@gmail.com
*/

var wemore 	= require('wemore');
var exec 	= require('child_process').exec;
var path	= require('path');

var deviceRefs = [], i = 0;

var loadDevices = function( devices ){

	for( var device in devices ){
		var dev = wemore.Emulate({ friendlyName: device, port: 9000 + i++ });
		var devprop = devices[device];

		dev.on( 'listening', (function(device, devprop) {
			return function(){
				console.log( device + " Now online, Now listening on", this.port );
			}
		})(device, devprop));

		dev.on('on', (function(device, devprop) {
			var command = devprop.oncommand;
			return function(){			
				console.log("Device", device, "recieved on" );
				if( command ){
					console.log( 'Executing command "', command, '"' );
					exec( command, function(error, stdout, stderr) {
						//console.log( arguments );
					});				
				}
			}
		})(device, devprop));

		dev.on('off', (function(device, devprop) {
			var command = devprop.offcommand;
			return function(){
				console.log("Device", device, "recieved off" );
				if( command ){
					console.log( 'Executing command "', command, '"');
					exec( command, function(error, stdout, stderr) {
						//console.log( arguments );
					});				
				}
			}
		})(device, devprop));
	}

};

var ProjectRoot = process.cwd();
var loadWemoEmulation = function( args ){
	var configpath = ProjectRoot + "/devices.json";
	if( args.length > 0 ){ configpath = path.resolve(args[0]); }
	try{
		console.log("Loading config file: '" + configpath + "'" );
		var deviceFile = require( configpath );
		loadDevices( deviceFile );
	}catch(e){
		console.log("Error:", e.message );
		console.log("Invalid Device Configuration File! Exiting..");
	}
};

var args = process.argv.slice(2);
loadWemoEmulation( args );