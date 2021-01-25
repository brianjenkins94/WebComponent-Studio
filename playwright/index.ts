import type { ChromiumBrowser } from "playwright-chromium";
import { chromium } from "playwright-chromium";

// Run code in nodeland from browserland
//await page.exposeFunction("functionName", function() {});

// Run code in browserland from nodeland
//await page.evaluate("body", function(elements) {});

// Run code in browserland from nodeland /for one or more elements/
//await page.$$eval("body", function(elements) {});

let browser;

export function getBrowserInstance(options: { devtools?: boolean; headless?: boolean } = {}): ChromiumBrowser | Promise<ChromiumBrowser> {
	if (browser !== undefined) {
		return browser;
	}

	options["devtools"] = options["devtools"] || !options["headless"];
	options["headless"] = options["headless"] || false;

	browser = chromium.launch({
		"devtools": options["devtools"],
		"headless": options["headless"]
	});

	return browser;
}

if (require.main === module) {
	function traverse(element) {
		const elements = [];

		(function recurse(element) {
			elements.push(element);

			if (element.children !== undefined) {
				for (const child of element.children) {
					recurse(child);
				}
			}
		})(element);

		return elements;
	}

	(async function() {
		const browser = await getBrowserInstance();

		const context = await browser.newContext();

		const page = await context.newPage();

		await page.goto("http://localhost:8080/courier-component.html");

		const client = await context.newCDPSession(page);

		await client.send("DOM.enable");
		await client.send("CSS.enable");

		const { root } = await client.send("DOM.getDocument", {
			"depth": -1,
			"pierce": true
		});

		const document = {
			"head": root.children[1].children[0],
			"body": root.children[1].children[1]
		};

		// const response = await client.send("CSS.getMatchedStylesForNode", {
		// 	"nodeId": document.body.nodeId
		// });

		const elements = traverse(document.body);
		console.log(elements);
	})();
}
