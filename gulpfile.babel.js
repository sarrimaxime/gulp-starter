'use strict'

// ---------------------------------------------------------------------o modules

import gulp 			from 'gulp'
import requireDir 		from 'require-dir'
import path 			from 'path'
import YAML 			from 'yamljs'


// ---------------------------------------------------------------------o require tasks

requireDir('./task-runner', { recurse: true })


// ---------------------------------------------------------------------o config

const config = YAML.load('./task-runner/config.yml')



// ---------------------------------------------------------------------o default task

const taskByExtension = {
	//'js': 'scripts',
	'styl': 'styles',
	//'js': 'scripts',
	'svg': 'sprites:svg',
	'png': {
		'favicons': 'favicons',
		'sprites': 'sprites:png'
	},
}


// --- Default task

gulp.task('default', () => {

	gulp.start('sprites:svg')
	gulp.start('sprites:png')
	gulp.start('scripts')
	gulp.start('styles')

	gulp.watch('./src/**/*', (event) => {

		const ext = path.extname(event.path).substr(1)
		const pathArray = event.path.split('/')
		const folder = pathArray[pathArray.length - 2]

		let taskname = null

		taskname = taskByExtension[ext]

		if (typeof taskname === 'object') {
			taskname = taskname[pathArray]
		}

		if (taskname) {
			gulp.start(taskname)
		}

	})



})


// --- Prod task

gulp.task('prod', () => {

	gulp.start('styles:prod')
	gulp.start('scripts:prod')

})