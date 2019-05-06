/// <reference path = "../jsuis.ts"/>
/**
 * JSTableHeaderCell
 * 
 * @author Yassuo Toda
 */
class JSTableHeaderCell extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLTableCellElement);
    constructor(text: string);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLTableCellElement) ? document.createElement("th") : args[0]);
        var cell: JSDiv = this.getCell();
        if (!cell) {
            cell = new JSDiv();
            this.add(cell);
            this.setCell(cell);
        }
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLTableCellElement);
            // constructor(text: string);
            if (args[0] instanceof HTMLTableCellElement) {
            } else if (typeof args[0] === "string") {
                var text: string = args[0];
                cell.setText(text);
            }
            break;
        default:
        }
    }
    init(): void {
        this.addClass("JSTableHeaderCell");
    }
    getCell(): JSDiv {
        return this.getData("container");
    }
    setCell(container: JSDiv) {
        this.setData("container", container);
    }
}
