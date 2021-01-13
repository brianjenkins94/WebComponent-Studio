/// <reference types="cypress" />

/* eslint-disable no-undef */

describe("Suite 1", function() {
	beforeEach(function() {
		cy.log("beforeEach()!");
	});

	it("Sanity Check", function() {
		cy.log("I am sane!");
	});
});
