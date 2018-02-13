/**
 * jsuis.defaultlf.LayeredPane
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.LayeredPane = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this, null);
	});
	jsuis.defaultlf.LayeredPane.prototype.add = function(component, constraints, index) {
		index = nvl(index, 0);
		var components = this.getComponents();
		if (components.length === 0) {
			SUPER.prototype.add.call(this, component);
			return;
		}
		var referenceConstraints;
		var i = 0;
		for (; i < components.length; i++) {
			var referenceComponent = components[i];
			referenceConstraints = referenceComponent.getConstraints();
			if (constraints <= referenceConstraints) {
				break;
			}
		}
		if (i === components.length) {
			SUPER.prototype.add.call(this, component);
			return;
		}
		if (constraints < referenceConstraints) {
			SUPER.prototype.add.call(this, component, null, i);
			return;
		}
		for (var j = i; j < components.length; j++) {
			var referenceComponent = components[j];
			referenceConstraints = referenceComponent.getConstraints();
			if (referenceConstraints !== constraints) {
				break;
			}
		}
		var n = j - i + 1;
		index = (index === -1 ? n - 1 : index);
		index = i + (n - 1 - index);
		SUPER.prototype.add.call(this, component, null, index);
	}
}) (jsuis);
