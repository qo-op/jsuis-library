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
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setUI("JSTable");
        
        var index: number = 0;
        
        this.setLayout(new JSTableLayout());
        
        var scrollPane: JSTableScrollPane = this.getScrollPane();
        scrollPane.setVisible(false);
        this.add(scrollPane);
        
        var scrollPaneView: JSPanel = new JSPanel();
        scrollPaneView.setStyle("position", "absolute");
        scrollPane.setViewportView(scrollPaneView);
        
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
    getScrollPane(): JSTableScrollPane {
        var scrollPane: JSTableScrollPane = this.getData("scrollPane");
        if (!scrollPane) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSTableScrollPane");
            if (element) {
                scrollPane = new JSTableScrollPane(element);
            } else {
                scrollPane = new JSTableScrollPane();
            }
            this.setData("scrollPane", scrollPane);
        }
        return scrollPane;
    }
    getHorizontalScrollPane(): JSTableHorizontalScrollPane {
        var horizontalScrollPane: JSScrollPane = this.getData("horizontalScrollPane");
        if (!horizontalScrollPane) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSTableHorizontalScrollPane");
            if (element) {
                horizontalScrollPane = new JSTableHorizontalScrollPane(element);
            } else {
                horizontalScrollPane = new JSTableHorizontalScrollPane();
            }
            this.setData("horizontalScrollPane", horizontalScrollPane);
        }
        return horizontalScrollPane;
    }
    getVerticalScrollPane(): JSTableVerticalScrollPane {
        var verticalScrollPane: JSScrollPane = this.getData("verticalScrollPane");
        if (!verticalScrollPane) {
            var horizontalScrollPane: JSTableHorizontalScrollPane = this.getHorizontalScrollPane();
            var element: HTMLElement = <HTMLElement> horizontalScrollPane.getChild("JSTableVerticalScrollPane");
            if (element) {
                verticalScrollPane = new JSTableVerticalScrollPane(element);
            } else {
                verticalScrollPane = new JSTableVerticalScrollPane();
            }
            this.setData("verticalScrollPane", verticalScrollPane);
        }
        return verticalScrollPane;
    }
    getTableHeader(): JSTableHeader {
        var tableHeader: JSTableHeader = this.getData("tableHeader");
        if (!tableHeader) {
            var horizontalScrollPane: JSTableHorizontalScrollPane = this.getHorizontalScrollPane();
            var horizontalScrollPaneView: JSComponent = horizontalScrollPane.getViewportView();
            var element: HTMLElement = <HTMLElement> horizontalScrollPaneView.getChild("JSTableHeader");
            if (element) {
                tableHeader = new JSTableHeader(element);
            } else {
                tableHeader = new JSTableHeader();
            }
            this.setData("tableHeader", tableHeader);
        }
        return tableHeader;
    }
    getTableContent(): JSTableContent {
        var tableContent: JSTableContent = this.getData("tableContent");
        if (!tableContent) {
            var verticalScrollPane: JSTableVerticalScrollPane = this.getVerticalScrollPane();
            var element: HTMLElement = <HTMLElement> verticalScrollPane.getChild("JSTableContent");
            if (element) {
                tableContent = new JSTableContent(element);
            } else {
                tableContent = new JSTableContent();
            }
            this.setData("tableContent", tableContent);
        }
        return tableContent;
    }
    getHorizontalScrollBar(): JSHorizontalScrollBar {
        var horizontalScrollBar: JSHorizontalScrollBar = this.getData("horizontalScrollBar");
        if (!horizontalScrollBar) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSHorizontalScrollBar");
            if (element) {
                horizontalScrollBar = new JSHorizontalScrollBar(element);
            } else {
                horizontalScrollBar = new JSHorizontalScrollBar();
            }
            this.setData("horizontalScrollBar", horizontalScrollBar);
        }
        return horizontalScrollBar;
    }
    getVerticalScrollBar(): JSVerticalScrollBar {
        var verticalScrollBar: JSVerticalScrollBar = this.getData("verticalScrollBar");
        if (!verticalScrollBar) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSVerticalScrollBar");
            if (element) {
                verticalScrollBar = new JSVerticalScrollBar(element);
            } else {
                verticalScrollBar = new JSVerticalScrollBar();
            }
            this.setData("verticalScrollBar", verticalScrollBar);
        }
        return verticalScrollBar;
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
}
