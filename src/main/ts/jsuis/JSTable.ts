/// <reference path = "../jsuis.ts"/>
/**
 * JSTable
 * 
 * @author Yassuo Toda
 */
class JSTable extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLTableElement);
    constructor(rows: any[][], columns: string[]);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLTableElement);
        super(args.length === 0 || !(args[0] instanceof HTMLTableElement) ? document.createElement("table") : args[0]);
        var tableHeader = this.getTableHeader();
        this.add(tableHeader);
        var tableBody = this.getTableBody();
        this.add(tableBody);
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
    }
    init(): void {
        this.addClass("JSTable");
    }
    getTableHeader(): JSTableHeader {
        var tableHeader: JSTableHeader = this.getData("tableHeader");
        if (!tableHeader) {
            tableHeader = new JSTableHeader();
            this.setData("tableHeader", tableHeader);
        }
        return tableHeader;
    }
    getTableBody(): JSTableBody {
        var tableBody: JSTableBody = this.getData("tableBody");
        if (!tableBody) {
            tableBody = new JSTableBody();
            this.setData("tableBody", tableBody);
        }
        return tableBody;
    }
    getColumns(): string[] {
        var tableHeader = this.getTableHeader();
        return tableHeader.getColumns();
    }
    setColumns(columns: string[]) {
        var tableHeader = this.getTableHeader();
        tableHeader.setColumns(columns);
    }
    getRows(): any[][] {
        var tableBody = this.getTableBody();
        return tableBody.getRows();
    }
    setRows(rows: any[][]) {
        var tableBody = this.getTableBody();
        tableBody.setRows(rows);
    }
}
