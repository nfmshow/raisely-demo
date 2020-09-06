const axios = require('axios');
const {
	INPUT_VALID, INPUT_INVALID, INPUT_UNSURE,
	BASE_URL, REQUEST_TIMEOUT
} = require('./../constants');

const isEmail = function(email) {
	const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
}

module.exports = function(dispatch, getState, options) {
	const value = getState().userInput[options.id].value.trim();
	let errorText;
	
	if (!value.length) {
		errorText = 'Your email is required!';
	}
	else if (!isEmail(value)) {
		errorText = 'Invalid email address!';
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
	
	axios({
		headers: {
			'Content-Type': 'application/json',
		},
		data: {
			campaignUuid: '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a',
			data: {
				email: value
			}
		},
		responseType: 'json',
		url: BASE_URL + '/check-user',
		method: 'post',
		timeout: REQUEST_TIMEOUT
	}).then(response => {
		console.log(response);
		if (response.data.data.status === 'EXISTS') {
			dispatch({
				type: INPUT_INVALID,
				payload: {
					id: options.id,
					errorText: 'Another user has registered with this email!'
				}
			});
			return;
		}
		throw '';
	}).catch(err => {
		console.log(err);
		dispatch({
			type: INPUT_VALID,
			payload: {
				id: options.id
			}
		})
	});
}