require('./css/icomoon.css');
require('./css/app.css');
require('lie/polyfill');

const React = require('react'); // Using Preact instead
const Emitter = require('tiny-emitter');
const App = require('./App');
const { toaster } = require('./services');

window.emitter = new Emitter();
window.toaster = toaster;

React.render(<App />, document.getElementById('root'));