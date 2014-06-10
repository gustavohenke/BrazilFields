module.exports = function( grunt ) {
	"use strict";
	
	var path = require( "path" );

	require( "time-grunt" )( grunt );	
	require( "load-grunt-config" )( grunt, {
		configPath: path.resolve( "build/config" )
	});
};