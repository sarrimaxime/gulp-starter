'use strict'

// ---------------------------------------------------------------------o modules

import gulp 			from 'gulp'
import YAML 			from 'yamljs'
import spritesmith		from 'gulp.spritesmith'
import svgmin			from 'gulp-svgmin'
import svgstore			from 'gulp-svgstore'
import rename			from 'gulp-rename'
import cheerio			from 'gulp-cheerio'


// ---------------------------------------------------------------------o config

const config = YAML.load('./task-runner/config.yml')



// ---------------------------------------------------------------------o task

gulp.task('sprites:png', () => {
	
	for (let sprite of config.sprites) {

		if (sprite.type ==='png') {

			let src = []
			const dest = config.site + sprite.dest

			for (let path of sprite.src) {
				src.push(config.src + path)
			}

			const spriteData = gulp.src( src )
				.pipe(spritesmith({
					imgName: sprite.filename,
					cssName: sprite.stylename,
					algorithm: 'binary-tree',
					cssTemplate: config.src + 'sprite/templates/sprite.mustache',
					cssFormat: 'scss',
					imgPath: '/' + sprite.imgPath + '/' + sprite.filename,
					padding: 1
				}))

			const imgDest = dest
			const cssDest = config.src + sprite.cssDest
			
			spriteData.img.pipe(gulp.dest(imgDest))
			spriteData.css.pipe(gulp.dest(cssDest))

		}

	}


})


gulp.task('sprites:svg', () => {
		
	for (let sprite of config.sprites) {

		if (sprite.type ==='svg') {

			let src = []
			const dest = config.site + sprite.dest

			for (let path of sprite.src) {
				src.push(config.src + path)
			}

			gulp
				.src(src)
				.pipe(svgmin())
				.pipe(svgstore({
					inlineSvg: true,
					emptyFills: true
				}))
				.pipe(cheerio({
					run: ($) => {
						const props = ['fill', 'fill-opacity', 'stroke', 'fill-rule']
						for (let prop of props) {
							$('[' + prop + ']').removeAttr(prop)
						}
						$('style').remove();
						$(this).attr('class', 'icon');
						$('path').attr('class', '');
					//parserOptions: { xmlMode: true }
					}
				}))	
				.pipe(rename( (path) => {
					const tmp = sprite.filename.split('.')
					path.basename = tmp[0]
					path.extname = sprite.filename.replace(tmp[0], '')
				}))
				.pipe(gulp.dest(dest))

		}
	}

})