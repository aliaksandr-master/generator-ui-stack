'use strict';

var _ = require('lodash');

module.exports = function (grunt, options) {
	this
		.clean([
			options.BUILD + '/*.jade'
		])

		.jade({
			options: {
				pretty: true,
				compileDebug: true,
				data: _.extend(require(options.CWD + '/' + options.SRC + '/templates-data/index.js'), {
					_: require('lodash')
				})
			},
			files: [
				{
					expand: true,
					cwd: options.SRC,
					dest: options.BUILD,
					src: '*.jade',
					ext: '.html'
				}
			]
		})
	;
};
