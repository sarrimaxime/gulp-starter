'use strict'

import EventEmitter from 'tiny-emitter'
import $ from 'jquery'
import Event from './../utils/event'
import W from './../utils/W'


export class Module extends EventEmitter {

	constructor () {

		super()

		this._initContent()
		this._initEvents()

	}

	// --------------------------------------------------------------o Private

	_initContent () {



	}

	_initEvents () {

		W
			.on(Event.RAF, ::this._onUpdate)
			.on(Event.RESIZE, ::this._onResize)



	}


	// --------------------------------------------------------------o Listeners

	_onResize () {

		

	}

	_onUpdate () {



	}



	// --------------------------------------------------------------o Getters


	// --------------------------------------------------------------o Setters

	

}

