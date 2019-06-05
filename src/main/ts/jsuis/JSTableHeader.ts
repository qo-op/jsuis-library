/// <reference path = "../jsuis.ts"/>
/**
 * JSTableHeader
 * 
 * @author Yassuo Toda
 */
class JSTableHeader extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLTableSectionElement) ? document.createElement("thead") : args[0]);
        
        var index: number = 0;
        
        var tableHeaderRow: JSTableRow = this.getTableHeaderRow();
        this.add(tableHeaderRow, null, index++);
    }
    init(): void {
        this.addClass("JSTableHeader");
    }
    getTableHeaderRow(): JSTableRow {
        var tableHeaderRow: JSTableRow = this.getData("tableHeaderRow");
        if (!tableHeaderRow) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSTableRow");
            if (element) {
                tableHeaderRow = new JSTableRow(element);
            } else {
                tableHeaderRow = new JSTableRow();
            }
            this.setData("tableHeaderRow", tableHeaderRow);
        }
        return tableHeaderRow;
    }
    getColumns(): string[] {
        var columns: string[] = [];
        var tableHeaderRow = this.getTableHeaderRow();
        var components: JSComponent[] = tableHeaderRow.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            columns.push(component.getText());
        }
        return columns;
    }
    setColumns(columns: string[]) {
        var tableHeaderRow = this.getTableHeaderRow();
        for (var i: number = 0; i < columns.length; i++) {
            var column: string = columns[i];
            tableHeaderRow.add(new JSTableHeaderCell(column));
        }
    }
}
