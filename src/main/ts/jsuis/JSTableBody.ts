/// <reference path = "../jsuis.ts"/>
/**
 * JSTableBody
 * 
 * @author Yassuo Toda
 */
class JSTableBody extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLTableSectionElement);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLTableSectionElement) ? document.createElement("tbody") : args[0]);
        this.setEditable(true);
    }
    init(): void {
        this.addClass("JSTableBody");
    }
    getRows(): any[][] {
        var rows: any[][] = [];
        var components: JSComponent[] = this.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var tableRow: JSTableRow = <JSTableRow> components[i];
            rows.push(tableRow.getValues());
        }
        return rows;
    }
    setRows(rows: any[][]) {
        for (var i: number = 0; i < rows.length; i++) {
            var row = rows[i];
            var tableRow: JSTableRow = new JSTableRow(row);
            this.add(tableRow);
        }
    }
}
