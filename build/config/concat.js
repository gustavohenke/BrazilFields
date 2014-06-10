module.exports = function( grunt ) {
	return {
		core: {
			options: {
				banner: grunt.file.read( "build/banner.txt" )
			},
			src: [
				"src/brazilfields.js",
				"src/*.js"
			],
			dest: "dist/brazilfields.js"
		}
	};
};