'use strict'

// ---------------------------------------------------------------------o modules

import gulp 			from 'gulp'
import spritesmith		from 'gulp.spritesmith'
import layout			from 'layout'
import YAML 			from 'yamljs'

import fs 				from 'fs'


// ---------------------------------------------------------------------o config

const config = YAML.load('./task-runner/config.yml')


// ---------------------------------------------------------------------o layout

// ---------------------------------------------------------------------o task

gulp.task('sprites:frames', () => {

try {
	fs.accessSync('./node_modules/gulp.spritesmith/node_modules/spritesmith/node_modules/layout/lib/algorithms/sprite-animation.algorithm.js', fs.R_OK | fs.W_OK)
}
catch(e) {
	/* 	
	*	--- /!\ Write doc for it! Or find a solution...
	*	
	*	I couldn't find a way to properly add an algorithm to gulp.spritesmith.
	*	Take the sprite-animation.algorithm file in ./task-runner/algorithms
	*	Paste it in ./node_modules/gulp.spritesmith/node_modules/spritesmith/node_modules/layout/lib/algorithms/
	*	Add the algorithn in the file ./node_modules/gulp.spritesmith/node_modules/spritesmith/node_modules/layout/lib/layout.js
	*	
	*/
	console.error('Check the comments in ./task-runner/sprites.animation.js for more info');
}
		
	for (let sprite of config.sprites) {

		if (sprite.type ==='frames') {

			let src = []

			for (let path of sprite.src) {

				let dirs = fs.readdirSync(config.src + path)

				for (let dir of dirs) {

					if (dir[0] === '.') {
						continue
					}

					let frames = fs.readdirSync(config.src + path + dir);
					let dest = config.site + sprite.dest;
					let src = config.src + sprite.src + dir + '/**/*.png';

					let framesNb = 9
					let spritesNb = frames.length / framesNb
					if (spritesNb === ~~ spritesNb) {
						spritesNb = ~~ spritesNb
					}
					else {
						spritesNb = ~~ spritesNb + 1
					}

					for (let i = 0; i < spritesNb; i++) {

						let nb = i
						if (i < 10) {
							nb = '0' + i
						}

						let spriteName = dir + '-' + nb + '.png'

						let src = []
						for (let j = 1; j <= framesNb; j++) {
							if (frames[i * framesNb + j]) {
								src.push(config.src + sprite.src + dir + '/' + frames[i * framesNb + j])
							}
						}

						let spriteData = gulp.src( src )
							.pipe(spritesmith({
								imgName: spriteName,
								cssName: 'dontCare',
								algorithm: 'sprite-animation'
							}))

							spriteData.img.pipe(gulp.dest(dest))

					}


				}

			}

		}

	}


})