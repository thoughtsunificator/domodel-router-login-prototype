import fs from "fs"
import path from "path"
import postcss from "rollup-plugin-postcss"
import postcssImport from "postcss-import"
import postcssEasyImport  from "postcss-easy-import"
import { terser } from "rollup-plugin-terser"
import copy from "rollup-plugin-copy"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import serve from "rollup-plugin-serve"
import livereload from "rollup-plugin-livereload"
import rollupWindowEnv from "@thoughtsunificator/rollup-plugin-window-env"
import config from "@thoughtsunificator/config-env"

const isProduction = process.env.BUILD === "production"
const isDevelopment = !isProduction

export default {
	input: "src/main.js",
	output: {
		file: "dist/bundle.js",
		format: "iife",
		sourcemap: isDevelopment
	},
	watch: {
		include: ["src/**/*"]
	},
	plugins: [
		rollupWindowEnv({ envPath : ".env.json", confPath : "data/config.json" }),
		postcss({
			minimize: isProduction,
			sourceMap: isDevelopment,
			extract: true,
			dependencies: ["src/**/*.css"],
			config: {
				watch: true
			},
			plugins: [postcssEasyImport(), postcssImport()]
		}),
		isProduction && terser(),
		copy({
			watch: isDevelopment ? "public" : false,
			targets: [{
				src: ["public/*"],
				dest: "dist",
				transform: function(contents, filename) {
					if(filename === "index.html") {
						return contents.toString().replace(/%{BASE_HREF}%/g, config.basePath)
					}
					return contents
				}
			}],
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
