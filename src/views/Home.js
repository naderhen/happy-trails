import __fetch from "isomorphic-fetch";
import React from "react";
import Router from "react-router";
import InlineCss from "react-inline-css";
import Transmit from "react-transmit";
var RouteHandler = Router.RouteHandler;
/**
 * Main React application entry-point for both the server and client.
 */
class Home extends React.Component {
	/**
	 * Runs on server and client.
	 */
	componentWillMount () {
		console.log(this.props)
	}

	/**
	 * Runs on server and client.
	 */
	render () {

		return (
			<div>
				<h1>Home</h1>
			</div>
		);
	}
}

/**
 * Use Transmit to query and return GitHub stargazers as a Promise.
 */
export default Transmit.createContainer(Home, {
	queryParams: {
		test: 'boom'
	},
	queries: {}
});
