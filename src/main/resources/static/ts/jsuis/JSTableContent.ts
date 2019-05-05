/// <reference path = "../jsuis.ts"/>
/**
 * JSTableContent
 * 
 * @author Yassuo Toda
 */
class JSTableContent extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLTableSectionElement);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLTableSectionElement) ? document.createElement("tbody") : args[0]);
        this.setClass("JSTableContent");
        this.setEditable(true);
    }
    getRows(): any[][] {
        var rows: any[][] = [];
        var components: JSComponent[] = this.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSTableRow = <JSTableRow> components[i];
            rows.push(component.getValues());
        }
        return rows;
    }
    setRows(rows: any[][]) {
        for (var i: number = 0; i < rows.length; i++) {
            var row = rows[i];
            var tableRow = new JSTableRow(row);
            this.add(tableRow);
        }
    }
}