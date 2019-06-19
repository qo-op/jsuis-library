/// <reference path = "../jsuis.ts"/>
/**
 * JSTableContent
 * 
 * @author Yassuo Toda
 */
class JSTableContent extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(rows: any[][], columns: string[]);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLTableElement) ? document.createElement("table") : args[0]);
        this.setUI("JSTableContent");
        
        var index: number = 0;
        
        var tableHeader = this.getTableHead();
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
    getTableHead(): JSTableHead {
        var tableHead: JSTableHead = this.getData("tableHead");
        if (!tableHead) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSTableHead");
            if (element) {
                tableHead = new JSTableHead(element);
            } else {
                tableHead = new JSTableHead();
            }
            this.setData("tableHead", tableHead);
        }
        return tableHead;
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
        var tableHeader: JSTableHead = this.getTableHead();
        return tableHeader.getColumns();
    }
    setColumns(columns: string[]) {
        var tableHeader: JSTableHead = this.getTableHead();
        tableHeader.setColumns(columns);
    }
    getRows(): any[][] {
        var tableBody: JSTableBody = this.getTableBody();
        return tableBody.getRows();
    }
    setRows(rows: any[][]) {
        var tableBody: JSTableBody = this.getTableBody();
        tableBody.setRows(rows);
    }
}
