'use strict';

module.exports = function (grunt, options) {

	this
		.include([
			'build/images',
			'build/scripts',
			'build/styles',
			'build/templates'
		])
	;
};
