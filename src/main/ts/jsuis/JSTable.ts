/// <reference path = "../jsuis.ts"/>
/**
 * JSTable
 * 
 * @author Yassuo Toda
 */
class JSTable extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(rows: any[][], columns: string[]);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSTable");
        // this.setEditable(true);
        
        this.setLayout(new JSTableLayout());
        
        var horizontalScrollPane: JSTableHorizontalScrollPane = this.getHorizontalScrollPane();
        this.add(horizontalScrollPane);
        
        var horizontalScrollPaneView: JSPanel = new JSPanel(new JSBorderLayout());
        horizontalScrollPane.setViewportView(horizontalScrollPaneView);
        
        var verticalScrollPane: JSTableVerticalScrollPane = this.getVerticalScrollPane();
        horizontalScrollPaneView.add(verticalScrollPane);
        
        var tableContent: JSTableContent = this.getTableContent();
        verticalScrollPane.setViewportView(tableContent);
        
        var tableHeader: JSTableHeader = this.getTableHeader();
        tableHeader.setAlign(JSBorderLayout.TOP);
        horizontalScrollPaneView.add(tableHeader);
        
        var horizontalScrollBar: JSHorizontalScrollBar = this.getHorizontalScrollBar();
        horizontalScrollBar.setVisible(false);
        this.add(horizontalScrollBar);
        
        var verticalScrollBar: JSHorizontalScrollBar = this.getVerticalScrollBar();
        verticalScrollBar.setVisible(false);
        this.add(verticalScrollBar);
        
        var tableLowerRightCorner: JSTableLowerRightCorner = this.getTableLowerRightCorner();
        tableLowerRightCorner.setVisible(false);
        this.add(tableLowerRightCorner);
        
        switch (arguments.length) {
        case 2:
            // constructor(rows: any[][], columns: string[]);
            if (arguments[0] instanceof Array && arguments[1] instanceof Array) {
                var rows: any[][] = arguments[0];
                var columns: string[] = arguments[1];
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
    getHorizontalScrollPane(): JSTableHorizontalScrollPane {
        var horizontalScrollPane: JSScrollPane = this.getData("horizontalScrollPane");
        if (!horizontalScrollPane) {
            horizontalScrollPane = new JSTableHorizontalScrollPane();
            this.setData("horizontalScrollPane", horizontalScrollPane);
        }
        return horizontalScrollPane;
    }
    getVerticalScrollPane(): JSTableVerticalScrollPane {
        var verticalScrollPane: JSScrollPane = this.getData("verticalScrollPane");
        if (!verticalScrollPane) {
            var horizontalScrollPane: JSTableHorizontalScrollPane = this.getHorizontalScrollPane();
            verticalScrollPane = new JSTableVerticalScrollPane();
            this.setData("verticalScrollPane", verticalScrollPane);
        }
        return verticalScrollPane;
    }
    getTableHeader(): JSTableHeader {
        var tableHeader: JSTableHeader = this.getData("tableHeader");
        if (!tableHeader) {
            var horizontalScrollPane: JSTableHorizontalScrollPane = this.getHorizontalScrollPane();
            var horizontalScrollPaneView: JSComponent = horizontalScrollPane.getViewportView();
            tableHeader = new JSTableHeader();
            this.setData("tableHeader", tableHeader);
        }
        return tableHeader;
    }
    getTableContent(): JSTableContent {
        var tableContent: JSTableContent = this.getData("tableContent");
        if (!tableContent) {
            var verticalScrollPane: JSTableVerticalScrollPane = this.getVerticalScrollPane();
            tableContent = new JSTableContent();
            this.setData("tableContent", tableContent);
        }
        return tableContent;
    }
    getHorizontalScrollBar(): JSHorizontalScrollBar {
        var horizontalScrollBar: JSHorizontalScrollBar = this.getData("horizontalScrollBar");
        if (!horizontalScrollBar) {
            horizontalScrollBar = new JSHorizontalScrollBar();
            this.setData("horizontalScrollBar", horizontalScrollBar);
        }
        return horizontalScrollBar;
    }
    getVerticalScrollBar(): JSVerticalScrollBar {
        var verticalScrollBar: JSVerticalScrollBar = this.getData("verticalScrollBar");
        if (!verticalScrollBar) {
            verticalScrollBar = new JSVerticalScrollBar();
            this.setData("verticalScrollBar", verticalScrollBar);
        }
        return verticalScrollBar;
    }
    getTableLowerRightCorner(): JSTableLowerRightCorner {
        var tableLowerRightCorner: JSTableLowerRightCorner = this.getData("tableLowerRightCorner");
        if (!tableLowerRightCorner) {
            tableLowerRightCorner = new JSTableLowerRightCorner();
            this.setData("tableLowerRightCorner", tableLowerRightCorner);
        }
        return tableLowerRightCorner;
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
        var tableContent: JSTableContent = this.getTableContent();
        return tableContent.getRows();
    }
    setRows(rows: any[][]) {
        var tableContent: JSTableContent = this.getTableContent();
        tableContent.setRows(rows);
    }
    addRow(row: any[]) {
        var tableContent: JSTableContent = this.getTableContent();
        tableContent.addRow(row);
    }
    removeRow(row: number): void {
        var tableContent: JSTableContent = this.getTableContent();
        tableContent.removeRow(row);
    }
    removeAllRows(): void {
        var tableContent: JSTableContent = this.getTableContent();
        tableContent.removeAllRows();
    }
    setEditable(editable: boolean) {
        var tableContent: JSTableContent = this.getTableContent();
        tableContent.setEditable(editable);
    }
}
