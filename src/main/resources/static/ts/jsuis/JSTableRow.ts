/// <reference path = "../jsuis.ts"/>
class JSTableRow extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLTableRowElement);
    constructor(values: any[]);
    // overload
    constructor(elementOrValues?: HTMLTableRowElement | any[]) {
        // constructor();
        // constructor(element: HTMLTableRowElement);
        super(elementOrValues === undefined || !(elementOrValues instanceof HTMLTableRowElement) ? document.createElement("tr") : elementOrValues);
        if (elementOrValues !== undefined && !(elementOrValues instanceof HTMLTableRowElement)) {
            // constructor(values: any[]);
            this.setValues(elementOrValues);
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
