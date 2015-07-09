'use strict';

module.exports = function (grunt, options) {

	this
		.watch({
			files: [
				options.SCRIPTS_SRC + '/**/*.js'
			],
			tasks: [
				'build/scripts'
			]
		})

		.watch({
			files: [
				options.IMAGES_SRC + '/**/*'
			],
			tasks: [
				'build/images'
			]
		})

		.watch({
			files: [
				options.STYLES_SRC + '/**/*'
			],
			tasks: [
				'build/styles'
			]
		})

		.watch({
			files: [
				options.SRC + '/**/*.jade'
			],
			tasks: [
				'build/templates'
			]
		})
	;
};
