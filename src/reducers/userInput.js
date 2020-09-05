const {
	INPUT_VALID, INPUT_INVALID, INPUT_UNSURE,
	SAVE_INPUT_VALUE, INITIAL_STATE
} = require('./../constants');

module.exports = function (state = INITIAL_STATE.userInput, action) {
	let newState = Object.assign({}, state);
	
	if (action.type === INPUT_INVALID) {
		newState[action.payload.id].isValid = 'no';
		newState[action.payload.id].errorText = action.payload.errorText;
		return newState;
	}
	else if (action.type === INPUT_VALID) {
		newState[action.payload.id].isValid = 'unsure';
		newState[action.payload.id].errorText = '';
		return newState;
	}
	else if (action.type === INPUT_UNSURE) {
		newState[action.payload.id].isValid = 'unsure';
		return newState;
	}
	else if (action.type === SAVE_INPUT_VALUE) {
		newState[action.payload.id].value = action.payload.value;
		return newState;
	}
	
	return state;
}