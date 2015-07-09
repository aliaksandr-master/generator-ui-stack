'use strict';

module.exports = function (grunt, options) {

	this
		.less({
			options: {
				strictUnits: true,
				sourceMap: false,
				relativeUrls: true,
				report: false
			},
			files: [{
				expand: true,
				cwd: options.STYLES_SRC,
				dest: options.STYLES_DEST,
				src: [
					'index.less'
				],
				ext: '.css'
			}]
		})

		.autoprefixer({
			options: {
				browsers: [ 'last 3 version', 'ie 9', 'android 4' ],
				diff: false,
				map: false
			},
			files: [{
				expand: true,
				overwrite: true,
				src: [
					options.STYLES_DEST + '/**/*.css'
				]
			}]
		})
	;
};
