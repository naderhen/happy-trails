import React from "react";
import {Route, DefaultRoute} from "react-router";
import Main from "views/Main";
import App from "views/App";
/**
 * The React Routes for both the server and the client.
 *
 * @class Routes
 */
export default (
	<Route handler={App}>
	    <Route path="main" handler={Main}/>
	</Route>
);
