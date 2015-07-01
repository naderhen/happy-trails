import __fetch from "isomorphic-fetch";
import React from "react";
import Router from "react-router";
import InlineCss from "react-inline-css";
import Transmit from "react-transmit";
var RouteHandler = Router.RouteHandler;
/**
 * Main React application entry-point for both the server and client.
 */
class App extends React.Component {
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
				<div className="ui secondary pointing menu">
	  				<a className="item active">
	    				Home
	  				</a>
	  				<a className="item">
	    				Itineraries
	  				</a>
	  				<div className="right menu">
	    				<a className="ui item">
	      					Logout
	    				</a>
	  				</div>
				</div>
				<div className="ui segment">
					<RouteHandler/>
				</div>
			</div>
		);
	}
}

/**
 * Use Transmit to query and return GitHub stargazers as a Promise.
 */
export default Transmit.createContainer(App, {
	queryParams: {
		test: 'boom'
	},
	queries: {}
});
