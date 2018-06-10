/**
 * jsuis.lf.TabbedPane
 */
(function(jsuis) {
	var SUPER = jsuis.lf.Panel;
	jsuis.lf.TabbedPane = jsuis.Object.extend(SUPER, function(tabPlacement) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		tabPlacement = nvl(tabPlacement, jsuis.Constants.TOP);
		this.setTabPlacement(tabPlacement);
		var tabPanel = new jsuis.lf.TabPanel();
		this.setTabPanel(tabPanel);
		tabPanel.setPadding(new jsuis.Insets(0, 2));
		SUPER.prototype.add.call(this, tabPanel, new jsuis.BorderConstraints(tabPlacement));
		var cardPane = new jsuis.lf.LayeredPane();
		this.setCardPane(cardPane);
		SUPER.prototype.add.call(this, cardPane);
		cardPane.setLayout(new jsuis.BorderLayout());
		var actionListener = new jsuis.ActionListener({
			actionPerformed: function(event) {
				var tabbedPane = this.getListenerComponent();
				var tabComponent = event.getSource();
				tabbedPane.setSelected(tabComponent);
			}
		});
		actionListener.setListenerComponent(this);
		this.setActionListener(actionListener);
	});
	jsuis.Object.addProperties(jsuis.lf.TabbedPane, {
		tabPlacement: null,
		tabPanel: null,
		cardPane: null,
		selection: null,
		actionListener: null
	});
	jsuis.lf.TabbedPane.prototype.addTab = function(tabComponent, cardComponent) {
		var tabPanel = this.getTabPanel();
		tabPanel.add(tabComponent);
		var cardPane = this.getCardPane();
		cardPane.add(cardComponent);
		cardComponent.setVisible(false);
		var actionListener = this.getActionListener();
		tabComponent.removeActionListener(actionListener);
		tabComponent.addActionListener(actionListener);
	}
	jsuis.lf.TabbedPane.prototype.getTabCount = function() {
		var tabPanel = this.getTabPanel();
		return tabPanel.getComponents().length;
	}
	jsuis.lf.TabbedPane.prototype.getTabComponentAt = function(index) {
		var tabPanel = this.getTabPanel();
		var tabComponents = tabPanel.getComponents();
		if (tabComponents) {
			return tabComponents[index];
		}
	}
	jsuis.lf.TabbedPane.prototype.setSelected = function(tabComponent) {
		var tabPanel = this.getTabPanel();
		var tabComponents = tabPanel.getComponents();
		var cardPane = this.getCardPane();
		var cardComponents = cardPane.getComponents();
		var oldSelection = this.getSelection();
		if (oldSelection) {
			oldSelection.setSelected(false);
			var index = tabComponents.indexOf(oldSelection);
			var cardComponent = cardComponents[index];
			cardComponent.setVisible(false);
		}
		this.setSelection(tabComponent);
		if (tabComponent) {
			tabComponent.setSelected(true);
			var index = tabComponents.indexOf(tabComponent);
			var cardComponent = cardComponents[index];
			// TODO setVisible -> validate
			cardComponent.setVisible(true);
			cardComponent.validate();
		}
		return this;
	}
	// TODO: CardLayout and BorderLayout
	jsuis.lf.TabbedPane.prototype.validate = function() {
		SUPER.prototype.validate.call(this);
		var selection = this.getSelection();
		if (!selection) {
			var tabPanel = this.getTabPanel();
			var components = tabPanel.getComponents();
			if (components.length) {
				this.setSelected(components[0]);
			}
		}
	}
}) (jsuis);
