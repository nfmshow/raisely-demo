const {
	INPUT_VALID, INPUT_INVALID, INPUT_UNSURE
} = require('./../constants');

module.exports = function(dispatch, getState, options) {
	const value = getState().userInput[options.id].value.trim();
	const siblingValue = getState().userInput[options.siblingId].value.trim();
	let errorText;
	
	if (!value.length) {
		errorText = 'Please confirm your password!';
	}
	else if (value !== siblingValue) {
		errorText = 'Passwords must match!';
	}
	
	if (errorText) {
		dispatch({
			type: INPUT_INVALID,
			payload: {
				id: options.id,
				errorText
			}
		});
		return;
	}
	
	dispatch({
		type: INPUT_VALID,
		payload: {
			id: options.id
		}
	});
	return;
}