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
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLTableElement) ? document.createElement("table") : arguments[0]);
        this.setUI("JSTableContent");
        
        var tableHeader = this.getTableHead();
        this.add(tableHeader);
        
        var tableBody = this.getTableBody();
        this.add(tableBody);
        
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
    }
    getTableHead(): JSTableHead {
        var tableHead: JSTableHead = this.getData("tableHead");
        if (!tableHead) {
            tableHead = new JSTableHead();
            this.setData("tableHead", tableHead);
        }
        return tableHead;
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
    addRow(row: any[]) {
        var tableBody: JSTableBody = this.getTableBody();
        tableBody.addRow(row);
    }
    removeRow(row: number): void {
        var tableBody: JSTableBody = this.getTableBody();
        tableBody.remove(row);
    }
    removeAllRows(): void {
        var tableBody: JSTableBody = this.getTableBody();
        tableBody.removeAll();
    }
    setEditable(editable: boolean) {
        var tableBody: JSTableBody = this.getTableBody();
        tableBody.setEditable(editable);
    }
}
