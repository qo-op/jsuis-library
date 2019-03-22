/// <reference path = "../jsuis.ts"/>
class JSTable extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLTableElement);
    constructor(rows: any[][]);
    constructor(rows: any[][], columns: string[]);
    // overload
    constructor(elementOrRows?: HTMLTableElement | any[][], columns?: string[]) {
        // constructor();
        // constructor(element: HTMLTableElement);
        super(elementOrRows === undefined || !(elementOrRows instanceof HTMLTableElement) ? document.createElement("table") : elementOrRows);
        var tableHeader = this.getTableHeader();
        if (!tableHeader) {
            tableHeader = new JSTableHeader();
            this.add(tableHeader);
            this.setTableHeader(tableHeader);
        }
        var tableContent = this.getTableContent();
        if (!tableContent) {
            tableContent = new JSTableContent();
            this.add(tableContent);
            this.setTableContent(tableContent);
        }
        if (elementOrRows !== undefined && !(elementOrRows instanceof HTMLTableElement)) {
            if (columns === undefined) {
                this.setRows(elementOrRows);
            } else {
                this.setRows(elementOrRows);
                this.setColumns(columns);
            }
        }
    }
    init(): void {
        this.addClass("JSTable");
        this.setStyle("border-collapse", "collapse");
    }
    getRows(): any[][] {
        var tableContent = this.getTableContent();
        return tableContent.getRows();
    }
    setRows(rows: any[][]) {
        var tableContent = this.getTableContent();
        tableContent.setRows(rows);
    }
    getColumns(): string[] {
        var tableHeader = this.getTableHeader();
        return tableHeader.getColumns();
    }
    setColumns(columns: string[]) {
        var tableHeader = this.getTableHeader();
        tableHeader.setColumns(columns);
    }
    getTableHeader(): JSTableHeader {
        return this.getData("tableHeader");
    }
    setTableHeader(tableHeader: JSTableHeader) {
        this.setData("tableHeader", tableHeader);
    }
    getTableContent(): JSTableContent {
        return this.getData("tableContent");
    }
    setTableContent(tableContent: JSTableContent) {
        this.setData("tableContent", tableContent);
    }
}
