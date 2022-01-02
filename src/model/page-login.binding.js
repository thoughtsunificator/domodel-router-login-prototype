import { Binding } from "domodel"

/**
 * @global
 */
class LoginBinding extends Binding {

	onCreated() {

		const { app } = this.properties

		this.root.addEventListener("submit", event => {
			event.preventDefault()
			app.emit("login")
		})

	}

}

export default LoginBinding
