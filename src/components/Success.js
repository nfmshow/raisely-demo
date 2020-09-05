const React = require('react');
class Success extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div className="success-page">
				<div className="text">
					Registration Successful
				</div>
				<div className="success-icon">
					<span className="icon icon-check-circle-light"></span>
				</div>
			</div>
		)
	}
}

module.exports = Success;

