let toaster = {
	colors: {
		success: {
			border: '#A4D0B5',
			background: '#E4F1E9',
			text: '#0A7F38'
		},
		error: {
			border: '#FF9999',
			background: '#FFE6E6',
			text: '#FF0000'
		},
		info: {
			border: '#341982',
			background: '#EDE9F8',
			text: '#4A24B9'
		}
	},
	isToasting: false,
	initialized: false,
	timeoutId: null,
	container: null,
	text: null,
	initialize: function() {
		this.container = document.querySelector('.toast');
		this.text = document.querySelector('.toast .text');
		this.initialized = true;
	},
	showToast: function(type, text) {
		this.container.style.backgroundColor = this.colors[type].background;
		this.container.style.borderColor = this.colors[type].border;
		this.text.style.color = this.colors[type].text;
		this.text.innerHTML = text;
		this.container.style.opacity = '1';
		this.container.style.height = '4rem';
		this.isToasting = true;
	},
	hideToast: function() {
		this.container.style.opacity = '0';
		this.container.style.height = '0';
		setTimeout((function() {
			this.isToasting = false;
		}).bind(this), 200);
	},
	fireToast: function(type, text) {
		this.showToast(type, text);
		this.timeoutId = window.setTimeout(this.hideToast, 4500);
	},
	toast: function(type, text) {
		if (!this.initialized) {
			this.initialize();
		}
		let timeout = 0;
		if (this.isToasting) {
			window.clearTimeout(this.timeoutId);
			this.hideToast();
			timeout = 200;
		}
		window.setTimeout((function() {
			this.fireToast(type, text)
		}).bind(this), timeout);
	}
};

for (let key in toaster) {
	if (typeof(toaster[key]) === 'function') {
		toaster[key] = toaster[key].bind(toaster);
	}
}

module.exports = toaster;