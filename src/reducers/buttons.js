const {
	SET_BUTTON_STATE, INITIAL_STATE
} = require('./../constants');

module.exports = function(state = INITIAL_STATE.buttons, action) {
	let newState = Object.assign({}, state);
	
	if (action.type === SET_BUTTON_STATE) {
		if (!newState[action.payload.id]) {
			newState[action.payload.id] = {};
		}
		newState[action.payload.id] = {
			...newState[action.payload.id],
			status: action.payload.status
		};
		return newState;
	}
	
	return state
}