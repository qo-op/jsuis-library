/// <reference path = "../jsuis.ts"/>
/**
 * JSTableHead
 * 
 * @author Yassuo Toda
 */
class JSTableHead extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLTableSectionElement) ? document.createElement("thead") : arguments[0]);
        this.setUI("JSTableHead");
        
        var tableHeadRow: JSTableHeadRow = this.getTableHeadRow();
        this.add(tableHeadRow);
    }
    getTableHeadRow(): JSTableHeadRow {
        var tableHeadRow: JSTableHeadRow = this.getData("tableHeadRow");
        if (!tableHeadRow) {
            tableHeadRow = new JSTableHeadRow();
            this.setData("tableHeadRow", tableHeadRow);
        }
        return tableHeadRow;
    }
    getColumns(): string[] {
        var tableHeadRow: JSTableHeadRow = this.getTableHeadRow();
        return tableHeadRow.getColumns();
    }
    setColumns(columns: string[]) {
        var tableHeadRow: JSTableHeadRow = this.getTableHeadRow();
        tableHeadRow.setColumns(columns);
    }
}
