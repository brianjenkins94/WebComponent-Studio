//import commonJs from "@rollup/plugin-commonjs";
//import nodeBuiltins from "rollup-plugin-node-builtins";
//import nodeGlobals from "rollup-plugin-node-globals";
//import nodeResolve from "@rollup/plugin-node-resolve";
import postProcess from "rollup-plugin-postprocess";
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
		typescript(),
		postProcess([
			[/^(?:import|export) .*$/gm, "//$0"],
			[/^( {4})+/gm, function(match) {
				return "\t".repeat(match.length / 4);
			}]
		])
	],
	"watch": {
		"clearScreen": false
	}
};
