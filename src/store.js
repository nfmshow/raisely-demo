const { createStore, applyMiddleware } = require('redux');
const rootReducer = require('./reducers');
const { thunk } = require('./services');
const { INITIAL_STATE } = require('./constants');

module.exports = createStore(rootReducer, INITIAL_STATE, applyMiddleware(thunk));