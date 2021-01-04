/// <reference types="cypress" />

import { log } from "./log";

module.exports = function(on, config) {
	on("task", {
		"log": log
	});
};
