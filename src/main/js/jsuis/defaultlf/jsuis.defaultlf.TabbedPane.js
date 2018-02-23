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
		SUPER.prototype.add.call(this, tabPanel, new jsuis.BorderConstraints(tabPlacement));
		var cardPanel = new jsuis.defaultlf.LayeredPane();
		this.setCardPanel(cardPanel);
		SUPER.prototype.add.call(this, cardPanel);
		cardPanel.setLayout(new jsuis.BorderLayout());
		cardPanel.setBorder(new jsuis.LineBorder());
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
	jsuis.Object.addProperties(jsuis.defaultlf.TabbedPane,
			new jsuis.Property("tabPlacement"),
			new jsuis.Property("tabPanel"),
			new jsuis.Property("cardPanel"),
			new jsuis.Property("selection"),
			new jsuis.Property("actionListener")
	);
	jsuis.defaultlf.TabbedPane.prototype.addTab = function(tabComponent, cardComponent) {
		var tabPanel = this.getTabPanel();
		tabPanel.add(tabComponent);
		var cardPanel = this.getCardPanel();
		cardPanel.add(cardComponent);
		cardComponent.setVisible(false);
		var actionListener = this.getActionListener();
		tabComponent.removeActionListener(actionListener);
		tabComponent.addActionListener(actionListener);
	}
	jsuis.defaultlf.TabbedPane.prototype.setSelected = function(tabComponent) {
		var tabPanel = this.getTabPanel();
		var tabComponents = tabPanel.getComponents();
		var cardPanel = this.getCardPanel();
		var cardComponents = cardPanel.getComponents();
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
