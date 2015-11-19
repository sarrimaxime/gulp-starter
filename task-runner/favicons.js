'use strict'

// ---------------------------------------------------------------------o modules

import gulp 			from 'gulp'
import YAML 			from 'yamljs'
import plumber 			from 'gulp-plumber'
import rename 			from 'gulp-rename'
import imageResize 		from 'gulp-image-resize'


// ---------------------------------------------------------------------o config

const config = YAML.load('./task-runner/config.yml')



// ---------------------------------------------------------------------o task

gulp.task('favicons', () => {
	
	const src = config.src + config.favicons.src
	const dest = config.site + config.favicons.dest

	for (let favicon of config.favicons.type) {

		const name = favicon.name
		const ext = favicon.ext

		let mainFaviconGenerated = false

		for (let size of favicon.sizes) {

			const filename = name + '-' + size + 'x' + size

			gulp
				.src(src + name + ext)
				.pipe(imageResize({
					width: size,
					height: size
				}))
				.pipe(rename({
					basename: filename
				}))
				.pipe(gulp.dest(dest))

			if (name == 'favicon' && mainFaviconGenerated === false) {

				mainFaviconGenerated = true

				gulp
					.src(dest + filename + '.png')
					.pipe(rename({
						basename: 'favicon',
						extname: '.ico'
					}))
					.pipe(gulp.dest(config.site))
			}

		}

	}


})