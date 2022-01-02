import { expect } from '@esm-bundle/chai';
import { Core, Binding } from "domodel"

import AppModel from "../src/model/app.js"
import AppBinding from "../src/model/app.binding.js"

import App from "../src/object/app.js"

const RootModel = { tagName: "div" }
let rootBinding

describe("App", () => {

	it("setUp", () => {
		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })
	})

	it("tearDown", () => {
		rootBinding.remove()
	})

	it("instance", () => {
		expect(AppBinding.prototype instanceof Binding).to.equal(true);
	})

	it("onCreated", () => {
		const app = new App("Your domodel app is running!")
		const binding = new AppBinding({ app })
		rootBinding.run(AppModel, { binding })
		expect(binding.root.textContent).to.equal("Your domodel app is running!")
	})

})
