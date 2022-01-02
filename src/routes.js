import { Model, Binding } from "domodel"
import { Route } from "@domodel/router"

import LoginModel from "./model/page-login.js"
import PageAModel from "./model/page-a.js"
import PageBModel from "./model/page-b.js"
import PageCModel from "./model/page-c.js"
import ProtectedModel from "./model/page-protected.js"
import LoginLayoutModel from "./model/layout-login.js"

import LoginBinding from "./model/page-login.binding.js"
import ProtectedBinding from "./model/page-protected.binding.js"

function userMiddleware(properties) {
	if(!properties.app.logged) {
		properties.router.emit("navigate", { path: "/login" })
		return true
	}
}


export default [
	new Route({
		match: "/login",
		model: LoginModel,
		binding: LoginBinding,
		middleware: (properties) => {
			if(properties.app.logged) {
				properties.router.emit("navigate", { path: "/protected" })
				return true
			}
		},
		layout: new Model(LoginLayoutModel, Binding)
	}),
	new Route({
		match: "/protected",
		model: ProtectedModel,
		binding: ProtectedBinding,
		middleware: userMiddleware
	}),
	new Route({
		match: "/a",
		model: PageAModel,
		binding: Binding,
		middleware: userMiddleware
	}),
	new Route({
		match: "/b",
		model: PageBModel,
		binding: Binding,
		middleware: userMiddleware
	}),
	new Route({
		match: "/c",
		model: PageCModel,
		binding: Binding,
		middleware: userMiddleware
	})
]
