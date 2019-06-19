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
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLTableSectionElement) ? document.createElement("thead") : args[0]);
        this.setUI("JSTableHead");
        
        var index: number = 0;
        
        var tableHeadRow: JSTableHeadRow = this.getTableHeadRow();
        this.add(tableHeadRow, null, index++);
    }
    getTableHeadRow(): JSTableHeadRow {
        var tableHeadRow: JSTableHeadRow = this.getData("tableHeadRow");
        if (!tableHeadRow) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSTableRow");
            if (element) {
                tableHeadRow = new JSTableHeadRow(element);
            } else {
                tableHeadRow = new JSTableHeadRow();
            }
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
