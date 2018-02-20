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
			SUPER.prototype.add.call(this, component, constraints);
			return;
		}
		var referenceConstraints;
		var i = 0;
		for (; i < components.length; i++) {
			var referenceComponent = components[i];
			referenceConstraints = nvl(referenceComponent.getConstraints(), new jsuis.Constraints());
			if (nvl(constraints, new jsuis.Constraints()).getLayer() <= referenceConstraints.getLayer()) {
				break;
			}
		}
		if (i === components.length) {
			SUPER.prototype.add.call(this, component, constraints);
			return;
		}
		if (nvl(constraints, new jsuis.Constraints()).getLayer() < referenceConstraints.getLayer()) {
			SUPER.prototype.add.call(this, component, constraints, i);
			return;
		}
		for (var j = i; j < components.length; j++) {
			var referenceComponent = components[j];
			referenceConstraints = nvl(referenceComponent.getConstraints(), new jsuis.Constraints());
			if (nvl(constraints, new jsuis.Constraints()).getLayer() !== referenceConstraints.getLayer()) {
				break;
			}
		}
		var n = j - i + 1;
		index = (index === -1 ? n - 1 : index);
		index = i + (n - 1 - index);
		SUPER.prototype.add.call(this, component, constraints, index);
	}
}) (jsuis);
