'use strict'

import EventEmitter from 'tiny-emitter'
import $ from 'jquery'
import Event from './event'
import { requestAnimationFrame, cancelAnimationFrame } from 'request-animation-frame-shim'

class W extends EventEmitter {

	constructor() {
		super()

		this.window = $(window)
		this.body = $('body')

		this.scrollTop = {
			real: 0,
			calc: 0
		}

		this.ww = $(window).width()
		this.wh = $(window).height()
		this.sw = screen.width
		this.sh = screen.height

		this._initContent()
		this._initEvents()

	}

	// ------------------------------------------------------------o Private


	_initContent () {

		this._onResize()

		this.rAF = requestAnimationFrame( () => {
			this._onUpdate(this)
		})

	}

	_initEvents () {

		this.window
			.on('load resize', (e) => {
				this._onResize(e)
			})

	}

	_onResize () {

		this.ww = this.window.width()
		this.wh = this.window.height()
		this.sw = screen.width
		this.sh = screen.height

		this.emit(Event.RESIZE)

	}    

	_onUpdate (that) {

		this.emit(Event.RAF)

		this.rAF = requestAnimationFrame( () => {
			this._onUpdate(this)
		})

	}

}

export default new W()