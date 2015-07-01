import {Server} from "hapi";
import Good from "good";
import React from "react";
import Router from "react-router";
import Transmit from "react-transmit";
import routes from "views/Routes";
import url from "url";

/**
 * Start Hapi server on port 8000.
 */
const server = new Server();
server.connection({port: process.env.PORT || 8000});

server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }
	
	server.start(function () {
		server.log("==> ✅  Server is listening");
		server.log("==> 🌎  Go to " + server.info.uri.toLowerCase());
	});
});



/**
 * Attempt to serve static requests from the public folder.
 */
server.route({
	method:  "*",
	path:    "/{params*}",
	handler: (request, reply) => {
		reply.file("static" + request.path);
	}
});

/**
 * Endpoint that proxies all GitHub API requests to https://api.github.com.
 */
server.route({
	method: "*",
	path: "/api/github/{path*}",
	handler: {
		proxy: {
			passThrough: true,
			mapUri (request, callback) {
				callback(null, url.format({
					protocol: "https",
					host:     "api.github.com",
					pathname: request.params.path,
					query:    request.query
				}));
			}
		}
	}
});

/**
 * Catch dynamic requests here to fire-up React Router.
 */
server.ext("onPreResponse", (request, reply) => {
	if (typeof request.response.statusCode !== "undefined") {
		return reply.continue();
	}

	Router.run(routes, request.path, (Handler, router) => {
		Transmit.renderToString(Handler).then(({reactString, reactData}) => {
			let output = (
				`<!doctype html>
				<html lang="en-us">
					<head>
						<meta charset="utf-8">
						<title>react-isomorphic-starterkit</title>
						<link rel="shortcut icon" href="/favicon.ico">
						<link rel="stylesheet" type="text/css" href="/semantic.css">
						<script src="/jquery-2.1.4.min.js"></script>
						<script src="/semantic.js"></script>
					</head>
					<body>
						<div id="react-root">${reactString}</div>
					</body>
				</html>`
			);

			const webserver = process.env.NODE_ENV === "production" ? "" : "//localhost:8080";
			output = Transmit.injectIntoMarkup(output, reactData, [`${webserver}/dist/client.js`]);

			reply(output);
		}).catch((error) => {
			reply(error.stack).type("text/plain").code(500);
		});
	})
});
