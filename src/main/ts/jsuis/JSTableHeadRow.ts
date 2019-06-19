/// <reference path = "../jsuis.ts"/>
/**
 * JSTableHeadRow
 * 
 * @author Yassuo Toda
 */
class JSTableHeadRow extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(columns: any[]);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLTableRowElement) ? document.createElement("tr") : args[0]);
        this.setUI("JSTableHeadRow");
        switch (args.length) {
        case 1:
            // constructor(values: any[]);
            if (args[0] instanceof Array) {
                var columns: any[] = args[0];
                this.setColumns(columns);
            }
            break;
        default:
        }
    }
    getColumns(): string[] {
        var columns: string[] = [];
        var components: JSComponent[] = this.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var tableHeadCell: JSTableHeadCell = <JSTableHeadCell> components[i];
            columns.push(tableHeadCell.getText());
        }
        return columns;
    }
    setColumns(columns: string[]) {
        for (var i: number = 0; i < columns.length; i++) {
            var column = columns[i];
            var tableHeadCell: JSTableHeadCell = new JSTableHeadCell(column);
            this.add(tableHeadCell);
        }
    }
}
