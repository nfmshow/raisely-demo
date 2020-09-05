require('preact/debug');
const React = require('react');
const { Switch, Route, Router, Redirect } = require('react-router-dom');
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
	return (
		<Switch>
			<Route path='/success' render={props => <Success {...props} />} />
			<Route path='/signup' render={props => <SignUp {...props} />} />
			<Redirect from='/' to='/signup' />
			<Route path='/signup' render={props => <SignUp {...props} />} />
		</Switch>
	)
}

class App extends React.Component {
	componentDidMount() {
		window.dispatchEvent(new window.CustomEvent('hide-basic-spinner'));
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

