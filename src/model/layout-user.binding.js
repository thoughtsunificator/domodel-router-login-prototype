import { Binding } from "domodel"

/**
 * @global
 */
class LayoutUserBinding extends Binding {

	onCreated() {

		const { app, router } = this.properties

		this.identifier.linkA.addEventListener("click", () => {
			router.emit("navigate", { path: "/a" })
		})

		this.identifier.linkB.addEventListener("click", () => {
			router.emit("navigate", { path: "/b" })
		})

		this.identifier.linkC.addEventListener("click", () => {
			router.emit("navigate", { path: "/c" })
		})

		this.identifier.logout.addEventListener("click", () => {
			app.emit("logout")
		})

	}

}

export default LayoutUserBinding
