'use strict'

// ---------------------------------------------------------------------o modules

import gulp 			from 'gulp'
import YAML 			from 'yamljs'

import fs 				from 'fs'
import plumber			from 'gulp-plumber'
import rename			from 'gulp-rename'


// ---------------------------------------------------------------------o config

const config = YAML.load('./task-runner/config.yml')



// ---------------------------------------------------------------------o task

gulp.task('yaml', () => {
	
	let files = fs.readdirSync(config.src + 'data/');
	let content = ''

	for (var i = 0; i < files.length; i++){
		var file = files[i];
		var fileNoExt = file.split('.')[0];
		var ext = file.split('.')[1];

		if (file !== fileNoExt && file[0] !== '.' && ext === 'yaml') {
			content += fs.readFileSync(config.src + 'data/' + file, 'utf8') + '\n'
		}


		if (fileNoExt === 'config') {
			let configContent = fs.readFileSync(config.src + 'data/' + file, 'utf8')
			fs.writeFileSync(config.site + 'config.json', JSON.stringify(YAML.parse(configContent)), 'utf8');
		}

	}

	let jsonContent = JSON.stringify(YAML.parse(content))

	fs.writeFileSync(config.src + 'data/data.json', jsonContent, 'utf8');

})