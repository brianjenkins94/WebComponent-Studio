/// <reference types="cypress" />

/* eslint-disable no-undef */

Cypress.Commands.overwrite("log", function(subject, message) {
	if (typeof message === "object" && message !== null) {
		message = JSON.stringify(message);
	}

	cy.task("log", message);
});
