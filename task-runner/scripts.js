'use strict'

// ---------------------------------------------------------------------o modules

import gulp 			from 'gulp'
import YAML 			from 'yamljs'

import plumber			from 'gulp-plumber'
import concat 			from 'gulp-concat'
import sourcemaps 		from 'gulp-sourcemaps'
import source 			from 'vinyl-source-stream'
import buffer 			from 'vinyl-buffer'
import browserify 		from 'browserify'
import shimify	 		from 'browserify-shim'
import watchify 		from 'watchify'
import babelify 		from 'babelify'
import aliasify 		from 'aliasify'
import stringify 		from 'stringify'
import uglifyify 		from 'uglifyify'
import nunjucksify 		from 'nunjucksify'
import util 	 		from 'gulp-util'
import prettyHrtime 	from 'pretty-hrtime'


// ---------------------------------------------------------------------o config

const config = YAML.load('./task-runner/config.yml')



let bundler = null
let startTime = process.hrtime()

const bundle = function (dest, filename) {
	bundler.bundle()
		.on('error', (er) => {
			console.log(er.message)
		})
		.pipe(plumber())
		.pipe(source(filename))
		//.pipe(buffer())
		.pipe(gulp.dest(dest))
		.on('end', () => {
			util.log('Finished', '\'' + util.colors.cyan('scripts') + '\'', 'after', util.colors.magenta(prettyHrtime(process.hrtime(startTime))))
		})
}


// ---------------------------------------------------------------------o task

gulp.task('scripts', () => {
	
	for (let script of config.scripts) {

		const src = config.src + script.src
		const dest = config.site + script.dest

		const b = browserify(src, {
        	paths: ['./node_modules', src],
			debug: true,
			extensions: ['.js', '.json'],
			cache: {},
			packageCache: {}
		})
		.transform(stringify(['.hbs', '.html', '.swig']))
		.transform(babelify, {
			presets: ['es2015', 'stage-0'],
			only: [ config.src + script.folder ]
		})
		.transform(shimify)
		.transform(aliasify)
		.transform(nunjucksify)

		bundler = watchify(b, { poll: true })

		bundler.on( 'update', () => {
			startTime = process.hrtime()
			util.log('Running', '\'' + util.colors.cyan('scripts') + '\'...')
			bundle(dest, script.filename)
		})	

		bundle(dest, script.filename)

	}


})

gulp.task('scripts:prod', () => {

	for (let script of config.scripts) {

		const src = config.src + script.src
		const dest = config.site + script.dest

		const b = browserify(src, {
			debug: true,
			false: ['.js', '.json', '.es6']
		})
		.transform(stringify(['.hbs', '.html', '.swig']))
		.transform(babelify, {
			presets: ['es2015', 'stage-0']
		})
		.transform({
			global: true
		}, 'uglifyify')

		bundler = b

		bundle(dest, script.filename)

	}
	
})