/// <reference path = "../jsuis.ts"/>
class JSTableHeader extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLTableSectionElement);
    // overload
    constructor(element?: HTMLTableSectionElement) {
        // constructor();
        // constructor(element: HTMLTableSectionElement);
        super(element === undefined ? document.createElement("thead") : element);
    }
    init(): void {
        this.addClass("JSTableHeader");
        this.setBackground("#f2f2f2");
    }
    getColumns(): string[] {
        var columns: string[] = [];
        var components: JSComponent[] = this.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            columns.push(component.getText());
        }
        return columns;
    }
    setColumns(columns: string[]) {
        for (var i: number = 0; i < columns.length; i++) {
            var column: string = columns[i];
            this.add(new JSTableHeaderCell(column));
        }
    }
}
