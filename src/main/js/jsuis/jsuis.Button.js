/**
 * jsuis.Button
 */
(function(jsuis) {
	var SUPER = jsuis.Component;
	jsuis.Button = jsuis.Object.extend(SUPER, function(text, icon) {
		var lookAndFeel = jsuis.UIManager.getLookAndFeel();
		this.setPeer(new jsuis[lookAndFeel].Button(text, icon));
	});
	jsuis.Object.addProperties(jsuis.Button, {
		action: null,
		propertyChangeListener: null
	});
	jsuis.Object.addPeerProperties(jsuis.Button, {
		text: null,
		icon: null,
		iconTextGap: null,
		selected: null,
		group: null
	});
	jsuis.Button.prototype.setAction = function(action) {
		var oldAction = this.getAction();
		if (oldAction && oldAction !== action) {
			this.removeActionListener(oldAction);
			var propertyChangeListener = this.getPropertyChangeListener();
			oldAction.removePropertyChangeListener(propertyChangeListener);
		}
		if (action) {
			this.addActionListener(action);
			var propertyChangeListener = new jsuis.PropertyChangeListener({
				propertyChange: function(event) {
					var button = this.getListenerComponent();
					var enabled = event.getNewValue();
					button.setEnabled(enabled);
				}
			});
			propertyChangeListener.setPropertyName("enabled");
			propertyChangeListener.setListenerComponent(this);
			this.setPropertyChangeListener(propertyChangeListener);
			action.addPropertyChangeListener(propertyChangeListener);
		}
		return this;
	}
}) (jsuis);
