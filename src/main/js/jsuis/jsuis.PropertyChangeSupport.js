/**
 * jsuis.PropertyChangeSupport
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.PropertyChangeSupport = jsuis.Object.extend(SUPER, function(source) {
		this.setSource(source);
		this.setPropertyChangeListeners({});
	});
	jsuis.Object.addProperties(jsuis.PropertyChangeSupport, {
		source: null,
		propertyChangeListeners: null
	});
	jsuis.PropertyChangeSupport.prototype.addPropertyChangeListener = function(propertyChangeListener) {
		var propertyName = propertyChangeListener.getPropertyName() || "";
		var propertyChangeListeners = this.getPropertyChangeListeners(propertyName);
		propertyChangeListeners.push(propertyChangeListener);
		if (propertyName !== "") {
			propertyChangeListeners = this.getPropertyChangeListeners();
			propertyChangeListeners.push(propertyChangeListener);
		}
	}
	jsuis.PropertyChangeSupport.prototype.removePropertyChangeListener = function(propertyChangeListener) {
		var propertyName = propertyChangeListener.getPropertyName() || "";
		var propertyChangeListeners = this.getPropertyChangeListeners(propertyName);
		var index = propertyChangeListeners.indexOf(propertyChangeListener);
		if (index !== -1) {
			propertyChangeListeners.splice(index, 1);
		}
		if (propertyName !== "") {
			var propertyChangeListeners = this.getPropertyChangeListeners();
			var index = propertyChangeListeners.indexOf(propertyChangeListener);
			if (index !== -1) {
				propertyChangeListeners.splice(index, 1);
			}
		}
	}
	jsuis.PropertyChangeSupport.prototype.getPropertyChangeListeners = function(propertyName) {
		propertyName = propertyName || "";
		var propertyChangeListeners = this.propertyChangeListeners;
		if (!propertyChangeListeners[propertyName]) {
			propertyChangeListeners[propertyName] = [];
		}
		return propertyChangeListeners[propertyName];
	}
	jsuis.PropertyChangeSupport.prototype.firePropertyChange = function(propertyName, oldValue, newValue) {
		var source = this.getSource();
		var propertyChangeEvent = new jsuis.PropertyChangeEvent(source, propertyName, oldValue, newValue);
		var propertyChangeListeners = this.getPropertyChangeListeners(propertyName);
		for (var i = 0; i < propertyChangeListeners.length; i++) {
			var propertyChangeListener = propertyChangeListeners[i];
			propertyChangeListener.propertyChange(propertyChangeEvent);
		}
	}
}) (jsuis);
