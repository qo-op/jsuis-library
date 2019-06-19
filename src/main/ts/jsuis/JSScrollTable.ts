/// <reference path = "../jsuis.ts"/>
/**
 * JSScrollTable
 * 
 * @author Yassuo Toda
 */
class JSScrollTable extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(rows: any[][], columns: string[]);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setUI("JSScrollTable");
        
        var index: number = 0;
        
        // this.setLayout(new JSGridBagLayout());
        this.setLayout(new JSBorderLayout());
        
        var panel: JSPanel = new JSPanel(new JSGridBagLayout());
        this.add(panel);
        
        var verticalScrollBar = this.getVerticalScrollBar();
        verticalScrollBar.setLayer(1);
        panel.add(verticalScrollBar, { gridx: 1, gridy: 0, weighty: 1, fill: JSGridBagLayout.VERTICAL }, index++);
        
        var horizontalScrollBar = this.getHorizontalScrollBar();
        horizontalScrollBar.setLayer(1);
        panel.add(horizontalScrollBar, { gridx: 0, gridy: 1, weightx: 1, fill: JSGridBagLayout.HORIZONTAL }, index++);
        
        var horizontalScrollPane: JSScrollPane = this.getHorizontalScrollPane();
        this.add(horizontalScrollPane);
        // this.add(horizontalScrollPane, { gridx: 0, gridy: 0, weightx: 1, weighty: 1, fill: JSGridBagLayout.BOTH }, index++);
        
        var view: JSPanel = new JSPanel(new JSBorderLayout());
        horizontalScrollPane.setViewportView(view.withId("view1"));
        
        var verticalScrollPane: JSScrollPane = this.getVerticalScrollPane();
        // verticalScrollPane.setStyle("position", "absolute");
        // verticalScrollPane.setStyle("top", "0");
        
        // verticalScrollPane.setHeight = function(height: number) {
            // console.log("height=" + height);
            // console.trace();
            // JSScrollPane.prototype.setHeight.call(verticalScrollPane, height);
        // }
        view.add(verticalScrollPane);
        
        var tableContent: JSTableContent = this.getTableContent();
        verticalScrollPane.setViewportView(tableContent.withId("view2"));
        
        var tableHeader: JSTableHeader = this.getTableHeader();
        // tableHeader.setStyle("position", "absolute");
        // tableHeader.setStyle("top", "0");
        tableHeader.setAlign(JSBorderLayout.TOP);
        view.add(tableHeader);
        
        switch (args.length) {
        case 2:
            // constructor(rows: any[][], columns: string[]);
            if (args[0] instanceof Array && args[1] instanceof Array) {
                var rows: any[][] = args[0];
                var columns: string[] = args[1];
                this.setRows(rows);
                this.setColumns(columns);
            }
            break;
        default:
        }
        
        horizontalScrollBar.addAdjustmentListener({
            adjustmentValueChanged(event: Event) {
                horizontalScrollPane.element.scrollLeft = horizontalScrollBar.element.scrollLeft;
            }
        });
        
        verticalScrollBar.addAdjustmentListener({
            adjustmentValueChanged(event: Event) {
                verticalScrollPane.element.scrollTop = verticalScrollBar.element.scrollTop;
            }
        });
    }
    getVerticalScrollBar(): JSScrollBar {
        var verticalScrollBar: JSScrollBar = this.getData("verticalScrollBar");
        if (!verticalScrollBar) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSVerticalScrollBar");
            if (element) {
                verticalScrollBar = new JSScrollBar(element);
            } else {
                verticalScrollBar = new JSScrollBar(JSScrollBar.VERTICAL);
            }
            this.setData("verticalScrollBar", verticalScrollBar);
        }
        return verticalScrollBar;
    }
    getHorizontalScrollBar(): JSScrollBar {
        var horizontalScrollBar: JSScrollBar = this.getData("horizontalScrollBar");
        if (!horizontalScrollBar) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSHorizontalScrollBar");
            if (element) {
                horizontalScrollBar = new JSScrollBar(element);
            } else {
                horizontalScrollBar = new JSScrollBar(JSScrollBar.HORIZONTAL);
            }
            this.setData("horizontalScrollBar", horizontalScrollBar);
        }
        return horizontalScrollBar;
    }
    getHorizontalScrollPane(): JSScrollPane {
        var horizontalScrollPane: JSScrollPane = this.getData("horizontalScrollPane");
        if (!horizontalScrollPane) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSScrollPane");
            if (element) {
                horizontalScrollPane = new JSScrollPane(element);
            } else {
                horizontalScrollPane = new JSScrollPane(JSScrollPane.VERTICAL_SCROLLBAR_NEVER, JSScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
            }
            this.setData("horizontalScrollPane", horizontalScrollPane);
        }
        return horizontalScrollPane;
    }
    getVerticalScrollPane(): JSScrollPane {
        var verticalScrollPane: JSScrollPane = this.getData("verticalScrollPane");
        if (!verticalScrollPane) {
            // var element: HTMLElement = <HTMLElement> this.getChild("JSScrollPane");
            // if (element) {
                // verticalScrollPane = new JSScrollPane(element);
            // } else {
                verticalScrollPane = new JSScrollPane(JSScrollPane.VERTICAL_SCROLLBAR_NEVER, JSScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
            // }
            this.setData("verticalScrollPane", verticalScrollPane);
        }
        return verticalScrollPane;
    }
    getTableHeader(): JSTableHeader {
        var tableHeader: JSTableHeader = this.getData("tableHeader");
        if (!tableHeader) {
            tableHeader = new JSTableHeader();
            this.setData("tableHeader", tableHeader);
        }
        return tableHeader;
    }
    getTableContent(): JSTableContent {
        var tableContent: JSTableContent = this.getData("tableContent");
        if (!tableContent) {
            tableContent = new JSTableContent();
            this.setData("tableContent", tableContent);
        }
        return tableContent;
    }
    getColumns(): string[] {
        var tableHeader = this.getTableHeader();
        return tableHeader.getColumns();
    }
    setColumns(columns: string[]) {
        var tableHeader: JSTableHeader = this.getTableHeader();
        tableHeader.setColumns(columns);
        var tableContent: JSTableContent = this.getTableContent();
        tableContent.setColumns(columns);
    }
    getRows(): any[][] {
        var tableContent = this.getTableContent();
        return tableContent.getRows();
    }
    setRows(rows: any[][]) {
        var tableContent = this.getTableContent();
        tableContent.setRows(rows);
    }
    validateHorizontally(): void {
        
        var tableHeader: JSTableHeader = this.getTableHeader();
        var tableHeaderHead: JSTableHead = tableHeader.getTableHead();
        var tableHeaderHeadRow: JSTableHeadRow = tableHeaderHead.getTableHeadRow();
        var tableHeaderHeadCells: JSComponent[] = tableHeaderHeadRow.getComponents();
        
        var tableContent: JSTableContent = this.getTableContent();
        var tableContentHead: JSTableHead = tableContent.getTableHead();
        var tableContentHeadRow: JSTableHeadRow = tableContentHead.getTableHeadRow();
        var tableContentHeadCells: JSComponent[] = tableContentHeadRow.getComponents();
        for (var i: number = 0; i < tableContentHeadCells.length; i++) {
            var tableContentHeadCell: JSTableHeadCell = <JSTableHeadCell> tableContentHeadCells[i];
            var tableHeaderHeadCell: JSTableHeadCell = <JSTableHeadCell> tableHeaderHeadCells[i];
            tableHeaderHeadCell.getContainer().setWidth(tableContentHeadCell.getPreferredWidth());
        }
        
        super.validateHorizontally();
        
        var horizontalScrollPane: JSScrollPane = this.getHorizontalScrollPane();
        var horizontalScrollBar: JSScrollBar = this.getHorizontalScrollBar();
        horizontalScrollBar.setStyle("display", tableHeader.getPreferredWidth() > horizontalScrollPane.getWidth() ? "" : "none");
        
        var verticalScrollBar: JSScrollBar = this.getVerticalScrollBar();
        verticalScrollBar.setMaximum(tableContent.getPreferredHeight());
        
        var verticalScrollPane: JSScrollPane = this.getVerticalScrollPane();
        if (tableHeader.getPreferredWidth() > horizontalScrollPane.getWidth()) {
            verticalScrollPane.setHeight(horizontalScrollPane.getHeight() - horizontalScrollBar.getHeight());
        } else {
            verticalScrollPane.setHeight(horizontalScrollPane.getHeight());
        }
    }
    validateVertically(): void {
        super.validateVertically();
        
        var tableHeader: JSTableHeader = this.getTableHeader();
        var tableContent: JSTableContent = this.getTableContent();
        
        var horizontalScrollBar: JSScrollBar = this.getHorizontalScrollBar();
        var verticalScrollBar: JSScrollBar = this.getVerticalScrollBar();
        
        var verticalScrollPane: JSScrollPane = this.getVerticalScrollPane();
        var horizontalScrollPane: JSScrollPane = this.getHorizontalScrollPane();
        // verticalScrollPane.setHeight(horizontalScrollPane.getHeight());
        if (tableHeader.getPreferredWidth() > horizontalScrollPane.getWidth()) {
            verticalScrollPane.setHeight(horizontalScrollPane.getHeight() - horizontalScrollBar.getHeight());
        } else {
            verticalScrollPane.setHeight(horizontalScrollPane.getHeight());
        }
        
        verticalScrollBar.setStyle("display", tableContent.getPreferredHeight() > verticalScrollPane.getHeight() ? "" : "none");
        
        horizontalScrollBar.setMaximum(tableHeader.getPreferredWidth());
        
        if (tableContent.getPreferredHeight() > verticalScrollPane.getHeight()) {
            horizontalScrollPane.setWidth(this.getWidth() - verticalScrollBar.getWidth());
        } else {
            horizontalScrollPane.setWidth(this.getWidth());
        }
    }
}
