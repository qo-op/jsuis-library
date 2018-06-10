/**
 * jsuis.lf.Timer
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.lf.Timer = jsuis.Object.extend(SUPER, function(delay, actionListener) {
		SUPER.prototype.constructor.call(this);
		this.setActionListeners([]);
		this.setDelay(delay);
		this.addActionListener(actionListener);
		this.setInitialDelay(delay);
		this.setRepeats(true);
	});
	jsuis.Object.addProperties(jsuis.lf.Timer, {
		actionListeners: null,
		delay: 0,
		actionListener: null,
		initialDelay: 0,
		timeout: null,
		interval: null,
		actionCommand: null
	});
	jsuis.lf.Timer.prototype.addActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		actionListeners.push(actionListener);
	}
	jsuis.lf.Timer.prototype.removeActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		var index = actionListeners.indexOf(actionListener);
		if (index !== -1) {
			actionListeners.splice(index, 1);
		}
	}
	jsuis.lf.Timer.prototype.fireActionPerformed = function() {
		var event = new jsuis.lf.ActionEvent().setSource(this).setId(jsuis.Constants.ACTION_PERFORMED).setActionCommand(this.getActionCommand());
		var actionListeners = this.getActionListeners();
		for (var i = 0; i < actionListeners.length; i++) {
			var actionListener = actionListeners[i];
			actionListener.actionPerformed(event);
		}
	}
	jsuis.lf.Timer.prototype.isRepeats = function() {
		return this.repeats;
	}
	jsuis.lf.Timer.prototype.setRepeats = function(repeats) {
		this.repeats = repeats;
		return this;
	}
	jsuis.lf.Timer.prototype.start = function() {
		this.stop();
		var initialDelay = this.getInitialDelay();
		var timer = this;
		var timeout = setTimeout(function() {
			timer.fireActionPerformed();
			var repeats = timer.isRepeats();
			if (repeats) {
				timer.stopInterval();
				var delay = timer.getDelay();
				var interval = setInterval(function() {
					timer.fireActionPerformed();
				}, delay);
				timer.setInterval(interval);
			}
		}, initialDelay);
		this.setTimeout(timeout);
	}
	jsuis.lf.Timer.prototype.stop = function() {
		try {
			this.stopInterval();
		} finally {
			this.stopTimeout();
		}
	}
	jsuis.lf.Timer.prototype.stopInterval = function() {
		var interval = this.getInterval();
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
	}
	jsuis.lf.Timer.prototype.stopTimeout = function() {
		var timeout = this.getTimeout();
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
	}
}) (jsuis);
