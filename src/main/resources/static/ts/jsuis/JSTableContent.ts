/// <reference path = "../jsuis.ts"/>
class JSTableContent extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLTableSectionElement);
    // overload
    constructor(element?: HTMLTableSectionElement) {
        // constructor();
        // constructor(element: HTMLTableSectionElement);
        super(element === undefined ? document.createElement("tbody") : element);
    }
    init(): void {
        this.addClass("JSTableBody");
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
