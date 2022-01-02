import { Observable } from "domodel"

class App extends Observable {

	/**
	 * @param {boolean} logged
	 */
	constructor() {
		super()
		this._logged = false
	}

	/**
	 * @type {boolean}
	 */
	get logged() {
		return this._logged
	}

}

export default App
