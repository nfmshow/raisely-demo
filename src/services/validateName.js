const {
	INPUT_VALID, INPUT_INVALID, INPUT_UNSURE
} = require('./../constants');

module.exports = function (dispatch, getState, options) {
	const value = getState().userInput[options.id].value.trim();
	let errorText;
	
	if (!value.length) {
		errorText = 'Your ' + (/^.*first.*$/.test(options.id.toLowerCase()) ? 'first' : 'last') + ' name is required!';
	}
	else if (value.length < 2) {
		errorText = 'Your ' + (/^.*first.*$/.test(options.id.toLowerCase()) ? 'first' : 'last') + ' name must contain a minimum of 2 characters';
	}
	else if (!value.replace(/[^a-zA-Z]/g, '').length) {
		errorText = 'Invalid name entered!';
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