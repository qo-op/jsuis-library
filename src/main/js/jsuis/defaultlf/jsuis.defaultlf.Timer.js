/**
 * jsuis.defaultlf.Timer
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.defaultlf.Timer = jsuis.Object.extend(SUPER, function(delay, actionListener) {
		SUPER.prototype.constructor.call(this);
		this.setActionListeners([]);
		this.setDelay(delay);
		this.addActionListener(actionListener);
		this.setInitialDelay(delay);
		this.setRepeats(true);
	});
	jsuis.Object.addProperties(jsuis.defaultlf.Timer,
			new jsuis.Property("actionListeners"),
			new jsuis.Property("delay"),
			new jsuis.Property("actionListener"),
			new jsuis.Property("initialDelay"),
			new jsuis.Property("timeout"),
			new jsuis.Property("interval"),
			new jsuis.Property("actionCommand")
	);
	jsuis.defaultlf.Timer.prototype.addActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		actionListeners.push(actionListener);
	}
	jsuis.defaultlf.Timer.prototype.removeActionListener = function(actionListener) {
		var actionListeners = this.getActionListeners();
		var index = actionListeners.indexOf(actionListener);
		if (index !== -1) {
			actionListeners.splice(index, 1);
		}
	}
	jsuis.defaultlf.Timer.prototype.fireActionPerformed = function() {
		var event = new jsuis.defaultlf.ActionEvent(this, jsuis.Constants.ACTION_PERFORMED, this.getActionCommand());
		var actionListeners = this.getActionListeners();
		for (var i = 0; i < actionListeners.length; i++) {
			var actionListener = actionListeners[i];
			actionListener.actionPerformed(event);
		}
	}
	jsuis.defaultlf.Timer.prototype.isRepeats = function() {
		return this.repeats;
	}
	jsuis.defaultlf.Timer.prototype.setRepeats = function(repeats) {
		this.repeats = repeats;
		return this;
	}
	jsuis.defaultlf.Timer.prototype.start = function() {
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
	jsuis.defaultlf.Timer.prototype.stop = function() {
		try {
			this.stopInterval();
		} finally {
			this.stopTimeout();
		}
	}
	jsuis.defaultlf.Timer.prototype.stopInterval = function() {
		var interval = this.getInterval();
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
	}
	jsuis.defaultlf.Timer.prototype.stopTimeout = function() {
		var timeout = this.getTimeout();
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
	}
}) (jsuis);
