const React = require('react');
const { connect } = require('react-redux');
const { SAVE_INPUT_VALUE, INPUT_UNSURE } = require('./../constants');

class PasswordInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			passwordVisible: false
		};
	}
	
	root = null
	
	componentDidMount() {
		this.root = document.getElementById(this.props.id);
		window.emitter.on('validate_all', (function(e) {
			this.handleBlur();
			return;
		}).bind(this));
	}
	
	togglePasswordVisibility = (function(e) {
		e.stopPropagation();
		this.save();
		this.setState(prevState => ({
			...prevState,
			passwordVisible: !prevState.passwordVisible
		}));
	}).bind(this)
	
	handleFocus = (function(e) {
		this.props.setUnsureState(this.props.id);
	}).bind(this)
	
	save = (function(e) {
		const text = this.root.querySelector('input').value;
		this.props.saveValue(this.props.id, text);
	}).bind(this)
	
	handleBlur = (function(e) {
		this.save();
		this.props.validate(this.props.id, this.props.validateFunction, this.props.siblingId);
		if (this.props.siblingValidateFunction) {
			this.props.validateSibling(this.props.id, this.props.siblingId, this.props.siblingValidateFunction);
		}
	}).bind(this)
	
	render() {
		
		return (
			<div id={this.props.id} className="input-container">
				<label className="input-label">
					<span>{this.props.label}</span>
				</label>
				<div className="input-wrapper">
					<input onFocus={this.handleFocus} onBlur={this.handleBlur}
						className={"modded-input" + ((this.props.isValid === "no") ? " invalid" : "")}
						type={this.state.passwordVisible ? "text" : "password"}
						name={this.props.name} value={this.props.value}
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
						<span tabindex="0" onMouseDown={this.togglePasswordVisibility}
							className={"icon info " + (this.state.passwordVisible ? "icon-eye-slash" : "icon-eye")}
						>
						</span>
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
		validate: (id, validateFunction, siblingId) => dispatch((dispatch, getState) => {
			validateFunction.apply(null, [dispatch, getState, { id, siblingId }]);
		}),
		validateSibling: (id, siblingId, siblingValidateFunction) => dispatch((dispatch, getState) => {
			if (getState().userInput[siblingId].isValid !== 'unsure') {
				siblingValidateFunction.apply(null, [dispatch, getState, {
					id: siblingId,
					siblingId: id
				}]);
			}
		})
	}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(PasswordInput);