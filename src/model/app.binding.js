import { RouterBinding } from "@domodel/router"

/**
 * @global
 */
class LayoutBinding extends RouterBinding {

	onCreated() {

		super.onCreated()

		const { app, router } = this.properties

		this.listen(app, "login", () => {
			localStorage.setItem("logged", "")
			app._logged = true
			router.emit("navigate", { path: "/protected" })
		})

		this.listen(app, "logout", () => {
			localStorage.removeItem("logged")
			app._logged = false
			router.emit("navigate", { path: "/login" })
		})

	}

}

export default LayoutBinding
