const React = require('react');
const { connect } = require('react-redux');
const { SAVE_INPUT_VALUE, INPUT_UNSURE } = require('./../constants');

class TextInput extends React.Component {
	constructor(props) {
		super(props);
	}
	
	root = null
	
	componentDidMount() {
		this.root = document.getElementById(this.props.id);
		window.emitter.on('validate_all', (function(e) {
			this.handleBlur();
			return;
		}).bind(this));
	}
	
	handleFocus = (function(e) {
		this.props.setUnsureState(this.props.id);
	}).bind(this)
	
	handleBlur = (function(e) {
		const text = this.root.querySelector('input').value;
		this.props.saveValue(this.props.id, text);
		this.props.validate(this.props.id, this.props.validateFunction);
	}).bind(this)
	
	render() {
		return (
			<div id={this.props.id} className="input-container">
				<label className="input-label">
					<span>{this.props.label}</span>
				</label>
				<div className="input-wrapper">
					<input className={"modded-input" + ((this.props.isValid === "no") ? " invalid" : "")}
						onFocus={this.handleFocus} onBlur={this.handleBlur} 
						type={this.props.type || "text"} value={this.props.value}
						name={this.props.name} 
					/>
					{(this.props.isValid !== "unsure") ? (
						<>
							{(this.props.isValid === "no") ? (
								<span className="icon invalid icon-times"></span>
							) : (
								<span className="icon valid icon-check"></span>
							)}
						</>
					) : (
						<></>
					)}
				</div>
				<div className="error-text">
					<small>
						{(this.props.isValid === "no") ? this.props.errorText : ""}
					</small>
				</div>
			</div>
		)
	}
}

const mapStateToProps = function(state, ownProps) {
	return {
		value: state.userInput[ownProps.id].value,
		errorText: state.userInput[ownProps.id].errorText,
		isValid: state.userInput[ownProps.id].isValid
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
		saveValue: (id, value) => dispatch({
			type: SAVE_INPUT_VALUE,
			payload: { id, value }
		}),
		setUnsureState: id => dispatch({
			type: INPUT_UNSURE,
			payload: { id }
		}),
		validate: (id, validateFunction) => dispatch((dispatch, getState) => {
			validateFunction.apply(null, [dispatch, getState, { id }]);
		})
	}
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(TextInput);