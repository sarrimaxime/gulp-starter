'use strict'

// ---------------------------------------------------------------------o modules

import gulp 			from 'gulp'
import YAML 			from 'yamljs'
import stylus 			from 'gulp-stylus'
import sourcemaps		from 'gulp-sourcemaps'
import autoprefixer		from 'gulp-autoprefixer'


// ---------------------------------------------------------------------o config

const config = YAML.load('./task-runner/config.yml')



// ---------------------------------------------------------------------o task

gulp.task('styles', () => {
	
	for (let style of config.styles) {

		let src = []
		const dest = config.site + style.dest

		for (let path of style.src) {
			src.push(config.src + path)
		}

		gulp.src(src)
			.pipe(sourcemaps.init())
			.pipe(stylus())
			.pipe(autoprefixer({
				 browsers: ['last 2 versions']
			}))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(dest))
	}

})

gulp.task('styles:prod', () => {
	
	for (let style of config.styles) {

		let src = []
		const dest = config.site + style.dest

		for (let path of style.src) {
			src.push(config.src + path)
		}

		gulp.src(src)
			.pipe(sourcemaps.init())
			.pipe(stylus({
				'compress': true
			}))
			.pipe(autoprefixer({
				 browsers: ['last 2 versions']
			}))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(dest))

	}

})