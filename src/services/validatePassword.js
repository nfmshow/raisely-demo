const {
	INPUT_VALID, INPUT_INVALID, INPUT_UNSURE
} = require('./../constants');

module.exports = function(dispatch, getState, options) {
	const value = getState().userInput[options.id].value.trim();
	let errorText;
	
	if (!value.length) {
		errorText = 'Your password is required!';
	}
	else if (value.length < 6) {
		errorText = 'Your password should have a minimum of 6 characters!';
	}
	else if (value.trim().length > 32) {
		errorText = 'Your password should have a maximum of 32characters!';
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