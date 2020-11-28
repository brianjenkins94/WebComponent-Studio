//import commonJs from "@rollup/plugin-commonjs";
//import nodeBuiltins from "rollup-plugin-node-builtins";
//import nodeGlobals from "rollup-plugin-node-globals";
//import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
	"input": "index.ts",
	"output": {
		"file": "docs/js/webcomponent-studio.js",
		"format": "esm"
	},
	"external": ["url"],
	"plugins": [
		//nodeResolve(),
		//commonJs(),
		//nodeBuiltins(),
		//nodeGlobals(),
		typescript()
	],
	"watch": {
		"clearScreen": false
	}
};
