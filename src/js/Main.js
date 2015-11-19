import dom from 'domquery'
import Event from './utils/Event'
import Normalize from './utils/Normalize'
import W from './utils/W'
import {Module} from './modules/Module'


class App {

	constructor () {

		console.log('%c# --------------------o Running App', 'background: #42e34d; color: #0F0F0F;')

		this.module = new Module()

	}

}

let app = new App()


