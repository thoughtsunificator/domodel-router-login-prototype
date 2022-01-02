import { expect } from '@esm-bundle/chai'
import App from "../src/object/app.js"

describe("App", () => {

	it("instance", () => {
		const date = new Date()
		const app = new App("foo")
		expect(app.message).to.equal("foo")
		expect(() => {
			app.message = null
		 }).to.throw(Error)
	})

})
