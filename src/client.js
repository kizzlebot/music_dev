import React from "react";
import ReactDOM from "react-dom";



// import * as ReactRouter from "react-router";
// import Transmit from "react-transmit";
// import createRoutes from "components/routes";
// import createBrowserHistory from 'history/lib/createBrowserHistory';



/**
 * Fire-up React Router.
 */
// const history = createBrowserHistory();


const reactRoot = window.document.getElementById("react-root");
var routes = require('./components/routes/routes.js').default;


ReactDOM.render(routes, reactRoot);



/**
 * Detect whether the server-side render has been discarded due to an invalid checksum.
 */
if (process.env.NODE_ENV !== "production") {
	if (!reactRoot.firstChild || !reactRoot.firstChild.attributes ||
	    !reactRoot.firstChild.attributes["data-react-checksum"]) {
		console.error("Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.");
	}
}

