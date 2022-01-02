import "./main.css"

import { Model, Core, Binding } from "domodel"
import { Route, Router, ErrorModel } from "@domodel/router"

import AppModel from "./model/app.js"
import UserLayoutModel from "./model/layout-user.js"
import ErrorLayoutModel from "./model/layout-error.js"

import AppBinding from "./model/app.binding.js"
import UserLayoutBinding from "./model/layout-user.binding.js"

import App from "./object/app.js"

import routes from "./routes.js"

window.addEventListener("load", function() {

	const app = new App()

	app._logged = localStorage.getItem("logged") !== null

	const router = new Router({
		routes,
		type: Router.TYPE.PATHNAME,
		initialPath: "/login",
		errorRoute: new Route({
			model: ErrorModel,
			layout: new Model(ErrorLayoutModel, Binding)
		}),
		defaultLayout: new Model(UserLayoutModel, UserLayoutBinding)
	})

	Core.run(AppModel, {
		binding: new AppBinding({ app, router }),
		parentNode: document.body
	})

})
