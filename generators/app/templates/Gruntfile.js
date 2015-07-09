'use strict';

module.exports = require('grunto')(function (grunt) {
	var CWD = __dirname;

	grunt.file.expand(['grunt/tasks/**/*.js']).forEach(function (f) {
		require(CWD + '/' + f)(grunt);
	});

	var BUILD = 'build';
	var SRC = 'src';

	this.context({
		CWD: CWD,
		SRC: SRC,
		BUILD: BUILD,
		IMAGES_SRC: SRC + '/images',
		IMAGES_DEST: BUILD + '/images',
		TEMPLATES_SRC: SRC + '/templates',
		TEMPLATES_DEST: BUILD + '/templates',
		STYLES_SRC: SRC + '/styles',
		STYLES_DEST: BUILD + '/styles',
		SCRIPTS_SRC: SRC + '/scripts',
		SCRIPTS_DEST: BUILD + '/scripts'
	});

	this.scan([{
		cwd: 'grunt/',
		src: [
			'**/*.js',
			'!tasks/**/*.js',
			'!**/_*.js',
			'!**/_*/**/*.js'
		]
	}]);

	return {
		watch: {
			options: {
				livereload: true,
				nospawn: true,
				interrupt: true
			}
		}
	};
});
