'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var yosay = require('yosay');
var _ = require('lodash');
var git  = require('gift');
var fs = require('fs');
var url = require('url');
var pkg = require('../../package.json');

var REPO_EXP = /^.*?(github\.com|bitbucket\.org)(?:\/|:)([^\/]+)\/([^\/]+)(?:\/?.*)$/;
var parseRepo = function (url) {
	url = url || '';
	url = url.replace(/^git@(github\.com|bitbucket\.org):/, 'https://$1/');

	return {
		raw: url,
		url: url.replace(REPO_EXP, 'https://$1/$2/$3').replace(/\.git$/, ''),
		host: url.replace(REPO_EXP, '$1'),
		user: url.replace(REPO_EXP, '$2'),
		name: url.replace(REPO_EXP, '$3').replace(/\.git$/, '')
	};
};


module.exports = yeoman.generators.Base.extend({
	initializing: function () {
		this.answers = {};
		this._git();
	},

	_git: function () {
		var done = this.async();
		var that = this;
		var destinationPath = this.destinationPath();

		if (!fs.existsSync(path.resolve(destinationPath, '.git'))) {
			done();
			return;
		}

		git(destinationPath).config(function (err, config) {
			if (err) {
				return done();
			}

			var items = (config || {}).items || {};
			var parsedUrl = url.parse(items['remote.origin.url'] || '');

			delete parsedUrl.auth;
			delete parsedUrl.query;
			delete parsedUrl.search;
			delete parsedUrl.hash;
			delete parsedUrl.path;

			that.repository = url.format(parsedUrl);

			done();
		});
	},

	prompting: function () {
		var that = this;
		var done = this.async();

		this.log(yosay('Welcome to the super-excellent ' + chalk.red('GeneratorUiStack') + ' generator!'));

		var prompts = [
			{
				type: "input",
				name: 'appname',
				message: 'Library Name',
				default: path.basename(this.destinationPath()),
				validate: function (value) {
					return /^[_a-zA-Z][a-zA-Z0-9_-]*$/.test(value);
				}
			},
			{
				type: 'input',
				name: 'version',
				message: 'Version',
				default: '1.0.0',
				validate: function (value) {
					return /^\d+\.\d+\.\d+(-.+)?$/.test(value);
				}
			},
			{
				type: "input",
				name: 'repository',
				message: 'GitHub Repository',
				validate: function (value) {
					return !value.length || REPO_EXP.test(value);
				},
				default: this.repository
			},
			{
				type: 'list',
				message: "Template Engine",
				name: "template_engine",
				choices: [
					{ value: 'jade', name: "Jade", checked: true }
				]
			},
			{
				type: 'list',
				message: "Style Engine",
				name: "style_engine",
				choices: [
					{ value: 'less', name: "Less", checked: true },
					//{ value: 'sass', name: "Sass" }
				]
			},
			{
				type: 'list',
				message: "UI framework",
				name: "ui_framework",
				choices: [
					{ value: 'bootstrap', name: "Bootstrap", checked: true },
					//{ value: 'ui_kit', name: "UI Kit" },
					//{ value: null, name: "none" }
				]
			},
			{
				type: "list",
				name: 'indent_type',
				message: 'CodeFormat: indent type',
				choices: [
					{ name: "tab", checked: true },
					{ name: "space" }
				]
			},
			{
				type: "input",
				name: 'indent_size',
				message: 'CodeFormat: indent size',
				default: 4
			}
		];

		this.prompt(prompts, function (answers) {
			_.each(prompts, function (v) {
				if (!answers.hasOwnProperty(v.name)) {
					answers[v.name] = null;
				}
			});

			that.answers = answers;
			done();
		});
	},

	prepareProps: function () {
		var cfg = _.clone(this.answers);

		delete cfg.repository;
		delete cfg.appname;

		cfg.app = {};
		cfg.app.name = this.answers.appname;

		cfg.repository = null;
		if (this.answers.repository) {
			cfg.repository = parseRepo(this.answers.repository);
		}

		this.config.set(cfg);
	},

	writing: {
		app: function () {
			// copy and template
			this._copyTpl('package.json');
			this._copyTpl('bower.json');
			this._copyDotTplFile('editorconfig');
			this._copyDotFile('gitattributes');
			this._copyDotFile('csscomb.json');
			this._copyDotFile('gitignore');
			this._copyDotFile('eslintrc');
			this._copyFile('Gruntfile.js');
			this._copyDir('grunt');
			this._copyDir('src');
		}
	},

	install: function () {
		this.installDependencies({
			bower: true,
			npm: true,
			skipInstall: this.options['skip-install'],
			callback: function () {
				console.log('Everything is ready!');
			}
		});
	},

	saveConfig: function () {
		this.config.save();
	},

	end: function () {
		this.log(yosay( chalk.green('E N J O Y !') ));
	},

	_copyDir: function (dirname) {
		this.expandFiles(dirname + '/**/*', { cwd: this.templatePath() }).forEach(function (file) {
			this.fs.copy(
				this.templatePath(file),
				this.destinationPath(file)
			);
		}, this);
	},

	_copyTplDir: function (dirname) {
		this.expandFiles(dirname + '/**/*', { cwd: this.templatePath() }).forEach(function (file) {
			this.fs.copyTpl(
				this.templatePath(file),
				this.destinationPath(file),
				this.config.getAll()
			);
		}, this);
	},

	_copyFile: function (file) {
		this.fs.copy(
			this.templatePath(file),
			this.destinationPath(file)
		);
	},

	_copyDotFile: function (file) {
		this.fs.copy(
			this.templatePath(file),
			this.destinationPath('.' + file)
		);
	},

	_copyDotTplFile: function (file) {
		this.fs.copyTpl(
			this.templatePath(file),
			this.destinationPath('.' + file),
			this.config.getAll()
		);
	},

	_copyTpl: function (file) {
		this.fs.copyTpl(
			this.templatePath(file),
			this.destinationPath(file),
			this.config.getAll()
		);
	}
});
