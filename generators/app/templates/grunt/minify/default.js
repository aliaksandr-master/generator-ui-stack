'use strict';

module.exports = function (grunt, options) {

	this
		.include([
			'minify/images',
			'minify/scripts',
			'minify/styles',
			'minify/templates'
		])
	;
};
