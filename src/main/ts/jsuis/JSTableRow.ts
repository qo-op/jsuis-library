/// <reference path = "../jsuis.ts"/>
/**
 * JSTableRow
 * 
 * @author Yassuo Toda
 */
class JSTableRow extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(values: any[]);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLTableRowElement) ? document.createElement("tr") : arguments[0]);
        this.setUI("JSTableRow");
        switch (arguments.length) {
        case 1:
            // constructor(values: any[]);
            if (arguments[0] instanceof Array) {
                var values: any[] = arguments[0];
                this.setValues(values);
            }
            break;
        default:
        }
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
