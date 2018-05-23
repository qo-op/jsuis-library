/**
 * jsuis.defaultlf.TabbedPane
 */
(function(jsuis) {
	var SUPER = jsuis.defaultlf.Panel;
	jsuis.defaultlf.TabbedPane = jsuis.Object.extend(SUPER, function(tabPlacement) {
		SUPER.prototype.constructor.call(this, new jsuis.BorderLayout());
		tabPlacement = nvl(tabPlacement, jsuis.Constants.TOP);
		this.setTabPlacement(tabPlacement);
		var tabPanel = new jsuis.defaultlf.Panel(new jsuis.FlowLayout(jsuis.Constants.LEFT, 0));
		this.setTabPanel(tabPanel);
		tabPanel.setPadding(new jsuis.Insets(0, 5));
		SUPER.prototype.add.call(this, tabPanel, new jsuis.BorderConstraints(tabPlacement));
		var cardPane = new jsuis.defaultlf.LayeredPane();
		this.setCardPane(cardPane);
		SUPER.prototype.add.call(this, cardPane);
		cardPane.setLayout(new jsuis.BorderLayout());
		cardPane.setBorder(new jsuis.LineBorder());
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
	jsuis.Object.addProperties(jsuis.defaultlf.TabbedPane, {
		tabPlacement: null,
		tabPanel: null,
		cardPane: null,
		selection: null,
		actionListener: null
	});
	jsuis.defaultlf.TabbedPane.prototype.addTab = function(tabComponent, cardComponent) {
		var tabPanel = this.getTabPanel();
		tabPanel.add(tabComponent);
		var cardPane = this.getCardPane();
		cardPane.add(cardComponent);
		cardComponent.setVisible(false);
		var actionListener = this.getActionListener();
		tabComponent.removeActionListener(actionListener);
		tabComponent.addActionListener(actionListener);
	}
	jsuis.defaultlf.TabbedPane.prototype.getTabCount = function() {
		var tabPanel = this.getTabPanel();
		return tabPanel.getComponents().length;
	}
	jsuis.defaultlf.TabbedPane.prototype.getTabComponentAt = function(index) {
		var tabPanel = this.getTabPanel();
		var tabComponents = tabPanel.getComponents();
		if (tabComponents) {
			return tabComponents[index];
		}
	}
	jsuis.defaultlf.TabbedPane.prototype.setSelected = function(tabComponent) {
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
			cardComponent.setVisible(true);
		}
		return this;
	}
	jsuis.defaultlf.TabbedPane.prototype.validate = function() {
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
