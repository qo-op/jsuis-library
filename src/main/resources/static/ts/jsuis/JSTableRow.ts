/// <reference path = "../jsuis.ts"/>
/**
 * JSTableRow
 * 
 * @author Yassuo Toda
 */
class JSTableRow extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLTableRowElement);
    constructor(values: any[]);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLTableRowElement) ? document.createElement("tr") : args[0]);
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLTableRowElement);
            // constructor(values: any[]);
            if (args[0] instanceof HTMLTableElement) {
            } else if (args[0] instanceof Array) {
                var values: any[] = args[0];
                this.setValues(values);
            }
            break;
        default:
        }
    }
    init(): void {
        this.addClass("JSTableRow");
    }
    getValues(): any[] {
        var values: any[] = [];
        var components: JSComponent[] = this.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var tableDataCell: JSTableDataCell = <JSTableDataCell> components[i];
            values.push(tableDataCell.getValue());
        }
        return values;
    }
    setValues(values: any[]) {
        for (var i: number = 0; i < values.length; i++) {
            var value = values[i];
            var tableDataCell = new JSTableDataCell(value);
            this.add(tableDataCell);
        }
    }
}
