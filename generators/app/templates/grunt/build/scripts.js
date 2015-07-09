'use strict';

module.exports = function (grunt, options) {

	this
		.eslint([
			options.SCRIPTS_SRC + '/**/*.js'
		])

		.clean([
			options.SCRIPTS_DEST
		])

		// vendor
		.concat({
			src: [
				'bower_components/jquery/dist/jquery.min.js',
				'bower_components/lodash/lodash.min.js',
				'bower_components/URIjs/src/URI.min.js',
				'bower_components/bootstrap-less/js/transition.js',
				'bower_components/bootstrap-less/js/alert.js',
				'bower_components/bootstrap-less/js/button.js',
				'bower_components/bootstrap-less/js/carousel.js',
				'bower_components/bootstrap-less/js/collapse.js',
				'bower_components/bootstrap-less/js/dropdown.js',
				'bower_components/bootstrap-less/js/modal.js',
				'bower_components/bootstrap-less/js/tooltip.js',
				'bower_components/bootstrap-less/js/popover.js',
				'bower_components/bootstrap-less/js/scrollspy.js',
				'bower_components/bootstrap-less/js/tab.js',
				'bower_components/bootstrap-less/js/affix.js',
				options.SCRIPTS_SRC + '/vendor.js'
			],
			dest: options.SCRIPTS_DEST + '/vendor.js'
		})

		// app
		.concat({
			src: [
				options.SCRIPTS_SRC + '/components/labelmaker.js',
				options.SCRIPTS_SRC + '/index.js'
			],
			dest: options.SCRIPTS_DEST + '/index.js'
		})
	;
};
