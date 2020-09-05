const React = require('react');
const { connect } = require('react-redux');

class Button extends React.Component {
	constructor(props) {
		super(props);
	}
	
	root = null
	
	componentDidMount() {
		this.root = document.getElementById(this.props.id);
		this.root.addEventListener('click', this.handleClick);
	}
	
	componentWillUnmount() {
		this.root.removeEventListener('click', this.handleClick);
	}
	
	handleClick = (function(e) {
		e.stopPropagation();
		this.props.runTask(this.props.id, this.props.task);
	}).bind(this)
	
	render() {
		return (
			<div id={this.props.id} tabindex="0" className="submit-button">
				{(this.props.status === "loading") ? (
					<div className="button-spinner"></div>
				) : (
					<span className={"icon " + this.props.icon}></span>
				)}
				<span class="button-text">{this.props.text}</span>
			</div>
		)
	}
}

const mapStateToProps = function(state, ownProps) {
	const button = state.buttons[ownProps.id]
	return {
		status: button ? button.status : 'rest'
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
		runTask: (id, task) => dispatch((dispatch, getState) => {
			task.apply(null, [dispatch, getState, { id }]);
		})
	}
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(Button);

