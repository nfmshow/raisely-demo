require('preact/debug');
const React = require('react');
const { Switch, Route, Router, Redirect, useRouteMatch } = require('react-router-dom');
const history = require('./history');
const { SignUp, Success } = require('./components');
const { Provider } = require('react-redux');
const store = require('./store');

const Routes = function(props) {
	/*
		Signup route appears twice to prevent an endless loop of
		redirects since the exact prop is not used in the Redirect
		component
	*/
	const prefix = window.location.href.includes('/app/raisely-signup') ? '/app/raisely-signup' : '';
	
	return (
		<Switch>
			<Route path={`${prefix}/success`}>
				<Success />
			</Route>
			<Route path={`${prefix}/signup`}>
				<SignUp />
			</Route>
			<Redirect from={`${prefix}/`} to={`${prefix}/signup`} />
			<Route path={`${prefix}/signup`}>
				<SignUp />
			</Route>
		</Switch>
	)
}

class App extends React.Component {
	componentDidMount() {
		window.dispatchEvent(new window.CustomEvent('hide-basic-spinner'));
		setTimeout(function() {
			window.toaster.toast('info', 'Welcome, please fill the form below');
		}, 2000);
	}
	
	render() {
		return (
			<Provider store={store}>
				<div>
					<div className="toast">
						<div className="text">
						</div>
					</div>
					<Router history={history}>
						<Routes />
					</Router>
				</div>
			</Provider>
		)
	}
}

module.exports = App;

