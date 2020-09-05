const axios = require('axios');
const history = require('./../history');
const {
	BASE_URL, REQUEST_TIMEOUT, SET_BUTTON_STATE,
	MARK_INVALID
} = require('./../constants');

module.exports = function(dispatch, getState, options) {
	window.emitter.emit('validate_all');
	const inputs = getState().userInput;
	
	for (let key in inputs) {
		if (inputs[key].isValid === 'no') {
			window.toaster.toast('error', 'One or more inputs have not been properly filled!');
			return;
		}
	}
	
	dispatch({
		type: SET_BUTTON_STATE,
		payload: {
			id: options.id,
			status: 'loading'
		}
	});
	
	axios({
		headers: {
			'Content-Type': 'application/json',
		},
		data: {
			firstName: inputs['firstname'].value,
			lastName: inputs['lastname'].value,
			email: inputs['email'].value,
			password: inputs['password'].value
		},
		responseType: 'json',
		url: BASE_URL + '/raisely',
		method: 'post',
		timeout: REQUEST_TIMEOUT
	}).then(response => {
		window.toaster.toast('success', 'Welldone ' +  inputs['firstname'].value + ', you have successfully completed your registration.');
	},
	error => {
		try {
			if (error.response.data.status === 'EXISTS') {
				dispatch({
					type: MARK_INVALID,
					payload: {
						id: 'email'
					}
				});
				window.toaster.toast('error', 'One or more inputs have not been properly filled!');
				history.push('/success');
				return;
			}
			throw '';
		}
		catch(err) {
			window.toaster.toast('error', 'Sorry, your registration could not be completed due to an error. Please try again.');
		}
	}).finally(() => {
		dispatch({
			type: SET_BUTTON_STATE,
			payload: {
				id: options.id,
				status: 'rest'
			}
		});
	});
	
}