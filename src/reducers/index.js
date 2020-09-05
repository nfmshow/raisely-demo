const { combineReducers } = require('redux');
const buttons = require('./buttons');
const userInput = require('./userInput');

module.exports = combineReducers({
	buttons,
	userInput
});