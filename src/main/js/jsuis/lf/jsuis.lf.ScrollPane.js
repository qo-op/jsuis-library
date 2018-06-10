/**
 * jsuis.lf.ScrollPane
 */
(function(jsuis) {
	var SUPER = jsuis.lf.LayeredPane;
	jsuis.lf.ScrollPane = jsuis.Object.extend(SUPER, function(view, vsbPolicy, hsbPolicy) {
		SUPER.prototype.constructor.call(this);
		this.setLayout(new jsuis.BorderLayout());
		
		var contentPane = new jsuis.lf.Panel(new jsuis.GridBagLayout());
		this.setContentPane(contentPane);
		this.add(contentPane);
		
		var viewport = new jsuis.lf.Viewport();
		this.setViewport(viewport);
		contentPane.add(viewport, new jsuis.GridBagConstraints()
			.setGridx(1).setGridy(1).setWeightx(1).setWeighty(1)
			.setFill(jsuis.Constants.BOTH));
		
		if (view) {
			if (view instanceof jsuis.Table || view instanceof jsuis.lf.Table) {
				var table = view.getPeer();
				var tableView = table.getTableView();
				var tableHeaderView = table.getTableHeaderView();
				this.setViewportView(tableView);
				var viewport = this.getViewport();
				var adjustmentListener = new jsuis.lf.AdjustmentListener({
					adjustmentValueChanged: function(event) {
						var scrollPane = this.getListenerComponent();
						var viewport = scrollPane.getViewport();
						var tableView = viewport.getView();
						var scrollLeft = viewport.getProperty("scrollLeft");
						var scrollTop = viewport.getProperty("scrollTop");
						tableView.setX(-scrollLeft);
						tableView.setY(-scrollTop);
						
						// TODO: LayoutManager
						
						var clientWidth = viewport.getProperty("clientWidth");
						var columnHeaderViewport = scrollPane.getColumnHeaderViewport();
						var columnHeaderViewportSize = columnHeaderViewport.getSize();
						if (columnHeaderViewportSize.getWidth() !== clientWidth) {
							columnHeaderViewport.setSize(new jsuis.Dimension(clientWidth, columnHeaderViewport.getHeight()));
						}
						
						columnHeaderViewport.setProperty("scrollLeft", scrollLeft);
						var tableHeaderView = columnHeaderViewport.getView();
						tableHeaderView.setX(-scrollLeft);
						tableHeaderView.paint();
						tableView.paint();
					}
				});
				adjustmentListener.setListenerComponent(this);
				viewport.addAdjustmentListener(adjustmentListener);
				this.setColumnHeaderView(tableHeaderView);
			} else {
				this.setViewportView(view);
			}
		}
		vsbPolicy = nvl(vsbPolicy, jsuis.Constants.VERTICAL_SCROLLBAR_AS_NEEDED);
		this.setVsbPolicy(vsbPolicy);
		hsbPolicy = nvl(hsbPolicy, jsuis.Constants.HORIZONTAL_SCROLLBAR_AS_NEEDED);
		this.setHsbPolicy(hsbPolicy);
	});
	jsuis.Object.addProperties(jsuis.lf.ScrollPane, {
		vsbPolicy: null,
		hsbPolicy: null,
		contentPane: null,
		viewport: null,
		columnHeaderViewport: null,
		rowHeaderViewport: null,
		scrollBarPanel: null,
		verticalScrollBar: null,
		horizontalScrollBar: null,
		scrollThumbPressedPoint: null
	});
	jsuis.lf.ScrollPane.prototype.getViewportView = function() {
		var viewport = this.getViewport();
		return viewport.getView();
	}
	jsuis.lf.ScrollPane.prototype.setViewportView = function(view) {
		var viewport = this.getViewport();
		viewport.setView(view);
		return this;
	}
	jsuis.lf.ScrollPane.prototype.getColumnHeaderView = function() {
		var columnHeaderViewport = this.getColumnHeaderViewport();
		if (columnHeaderViewport) {
			return columnHeaderViewport.getView();
		}
	}
	jsuis.lf.ScrollPane.prototype.setColumnHeaderView = function(columnHeaderView) {
		var contentPane = this.getContentPane();
		var columnHeaderViewport = this.getColumnHeaderViewport();
		if (!columnHeaderViewport) {
			columnHeaderViewport = new jsuis.lf.Viewport();
			this.setColumnHeaderViewport(columnHeaderViewport);
			columnHeaderViewport.setStyleProperty("overflow", "hidden");
			contentPane.add(columnHeaderViewport, new jsuis.GridBagConstraints()
				.setGridx(1).setGridy(0).setWeightx(1)
				.setFill(jsuis.Constants.HORIZONTAL));
			columnHeaderViewport.setPreferredSize(new jsuis.Dimension(0, columnHeaderView.getPreferredSize().getHeight()));
		}
		columnHeaderViewport.setView(columnHeaderView);
		return this;
	}
	jsuis.lf.ScrollPane.prototype.getRowHeaderView = function() {
		var columnHeaderViewport = this.getRowHeaderViewport();
		if (columnHeaderViewport) {
			return columnHeaderViewport.getView();
		}
	}
	jsuis.lf.ScrollPane.prototype.setRowHeaderView = function(rowHeaderView) {
		var contentPane = this.getContentPane();
		var rowHeaderViewport = this.getRowHeaderViewport();
		if (!rowHeaderViewport) {
			rowHeaderViewport = new jsuis.lf.Viewport();
			this.setRowHeaderViewport(rowHeaderViewport);
			rowHeaderViewport.setStyleProperty("overflow", "auto");
			contentPane.add(rowHeaderViewport, new jsuis.GridBagConstraints()
				.setGridx(0).setGridy(1).setWeighty(1)
				.setFill(jsuis.Constants.VERTICAL));
			rowHeaderView.setPreferredSize(new jsuis.Dimension(rowHeaderView.getPreferredSize().getWidth(), 0));
		}
		rowHeaderViewport.setView(rowHeaderView);
		return this;
	}
	// TODO ScrollPaneLayout
	jsuis.lf.ScrollPane.prototype.doLayout = function() {
		var view = this.getViewportView();
		if (view) {
			view.setSize(this.getSize());
			var viewPreferredSize = view.getPreferredSize();
			view.setSize(viewPreferredSize);
			var columnHeaderView = this.getColumnHeaderView();
			if (columnHeaderView) {
				columnHeaderView.setSize(new jsuis.Dimension(view.getWidth(), columnHeaderView.getPreferredSize().getHeight()));
			}
		}
		SUPER.prototype.doLayout.call(this);
	}
	jsuis.lf.ScrollPane.prototype.getMinimumSize = function() {
		return new jsuis.Dimension(0, 0);
	}
}) (jsuis);
