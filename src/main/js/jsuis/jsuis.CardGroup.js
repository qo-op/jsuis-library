/**
 * jsuis.CardGroup
 */
(function(jsuis) {
	var SUPER = jsuis.Object;
	jsuis.CardGroup = jsuis.Object.extend(SUPER, function() {
		SUPER.prototype.constructor.call(this);
		this.setCards([]);
	});
	jsuis.Object.addProperties(jsuis.CardGroup, {
		cards: null,
		selection: null
	});
	jsuis.CardGroup.prototype.add = function(card) {
		var cards = this.getCards();
		cards.push(card);
		card.setVisible(false);
	}
	jsuis.CardGroup.prototype.remove = function(card) {
		var cards = this.getCards();
		var index = cards.indexOf(card);
		if (index === -1) {
			return;
		}
		cards.splice(index, 1);
		var selection = this.getSelection();
		if (card === selection) {
			this.setSelection(null);
		}
	}
	jsuis.CardGroup.prototype.setVisible = function(card) {
		var oldSelection = this.getSelection();
		if (oldSelection) {
			oldSelection.setVisible(false);
		}
		this.setSelection(card);
		if (card) {
			card.setVisible(true);
		}
		return this;
	}
}) (jsuis);
