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
        // constructor();
        // constructor(element: HTMLTableRowElement);
        super(args.length === 0 || !(args[0] instanceof HTMLTableRowElement) ? document.createElement("tr") : args[0]);
        switch (args.length) {
        case 1:
            // constructor(values: any[]);
            if (args[0] instanceof Array) {
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
            var tableCell: JSTableCell = <JSTableCell> components[i];
            values.push(tableCell.getValue());
        }
        return values;
    }
    setValues(values: any[]) {
        for (var i: number = 0; i < values.length; i++) {
            var value = values[i];
            var tableCell: JSTableCell = new JSTableCell(value);
            this.add(tableCell);
        }
    }
}
