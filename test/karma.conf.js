// Karma configuration
module.exports = function( config ) {
	"use strict";
	
	var path = require( "path" );
	
	config.set({
		basePath: path.resolve( __dirname, ".." ),
		frameworks: [ "mocha" ],
		preprocessors: {},
		files: [
			// Libs
			"libs/angular/angular.js",
			"libs/angular-mocks/angular-mocks.js",
			"libs/chai/chai.js",
			
			// Sources
			"src/*.js",
			
			// Specs
			"test/spec/**/*.js"
		],
		reporters: [ "progress" ],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: [ "PhantomJS" ],
		singleRun: false
	});
};