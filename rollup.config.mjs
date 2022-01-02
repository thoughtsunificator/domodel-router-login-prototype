import fs from "fs"
import path from "path"
import postcss from "rollup-plugin-postcss"
import postcssImport from "postcss-import"
import postcssEasyImport  from "postcss-easy-import"
import { terser } from "rollup-plugin-terser"
import copy from "rollup-plugin-copy-watch"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import serve from "rollup-plugin-serve"
import livereload from "rollup-plugin-livereload"
import rollupWindowEnv from "@thoughtsunificator/rollup-plugin-window-env"
import config from "@thoughtsunificator/config-env"

const isProduction = process.env.BUILD === "production"
const isDevelopment = !isProduction

function replaceHTMLVars() {
	fs.readFile("public/index.html", 'utf8', function (err,data) {
		if (err) {
			return console.log(err)
		}
		const result = data.replace(/%{BASE_HREF}%/g, config.basePath)
		fs.writeFile("public/index.html", result, 'utf8', function (err) {
			 if (err) return console.log(err)
		})
	})
}

export default {
	input: "src/main.js",
	output: {
		file: "dist/bundle.js",
		format: "iife",
		sourcemap: isDevelopment
	},
	plugins: [
		replaceHTMLVars(),
		rollupWindowEnv({ envPath : ".env.json", confPath : "data/config.json" }),
		postcss({
			minimize: isProduction,
			sourceMap: isDevelopment,
			extract: true,
			plugins: [postcssEasyImport(), postcssImport()]
		}),
		isProduction && terser(),
		copy({
			watch: isDevelopment ? "public" : false,
			targets: [{ src: "public/*", dest: "dist" }],
			flatten: false
		}),
		nodeResolve(),
		isDevelopment && serve({
			contentBase: "dist",
			historyApiFallback: true,
			port: 3000
		}),
		isDevelopment && livereload("dist")
	]
}
