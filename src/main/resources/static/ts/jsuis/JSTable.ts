/// <reference path = "../jsuis.ts"/>
/**
 * JSTable
 * 
 * @author Yassuo Toda
 */
class JSTable extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLTableElement);
    constructor(rows: any[][]);
    constructor(rows: any[][], columns: string[]);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLTableElement) ? document.createElement("table") : args[0]);
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
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLTableElement);
            // constructor(rows: any[][]);
            if (args[0] instanceof HTMLTableElement) {
            } else if (args[0] instanceof Array) {
                var rows: any[][] = args[0];
                this.setRows(rows);
            }
            break;
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
        this.setClass("JSTable");
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
