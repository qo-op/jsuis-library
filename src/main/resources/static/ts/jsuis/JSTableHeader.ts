/// <reference path = "../jsuis.ts"/>
/**
 * JSTableHeader
 * 
 * @author Yassuo Toda
 */
class JSTableHeader extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLTableSectionElement);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLTableSectionElement) ? document.createElement("thead") : args[0]);
        this.setClass("JSTableHeader");
        // this.setBackground("#f2f2f2");
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
