const actions = require('./actions');
const miscellaneous = require('./miscellaneous');
const INITIAL_STATE = require('./initialState');

module.exports = {
	...actions,
	...miscellaneous,
	INITIAL_STATE
}