const inputState = {
	isValid: 'unsure',
	errorText: '',
	value: ''
};

module.exports = {
	userInput: {
		firstname: Object.assign({}, inputState),
		lastname: Object.assign({}, inputState),
		email: Object.assign({}, inputState),
		password: Object.assign({}, inputState),
		confirm_password: Object.assign({}, inputState)
	},
	buttons: {}
}