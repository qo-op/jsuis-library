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
        
        var index: number = 0;
        
        var tableHeader = this.getTableHeader();
        this.add(tableHeader, null, index++);
        
        var tableBody = this.getTableBody();
        this.add(tableBody, null, index++);
        
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
            var element: HTMLElement = <HTMLElement> this.getChild("JSTableHeader");
            if (element) {
                tableHeader = new JSTableHeader(element);
            } else {
                tableHeader = new JSTableHeader();
            }
            this.setData("tableHeader", tableHeader);
        }
        return tableHeader;
    }
    getTableBody(): JSTableBody {
        var tableBody: JSTableBody = this.getData("tableBody");
        if (!tableBody) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSTableBody");
            if (element) {
                tableBody = new JSTableBody(element);
            } else {
                tableBody = new JSTableBody();
            }
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
