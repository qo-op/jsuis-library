/// <reference path = "../jsuis.ts"/>
/**
 * JSTableDataCell
 * 
 * @author Yassuo Toda
 */
class JSTableDataCell extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLTableCellElement);
    constructor(value: any);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLTableCellElement) ? document.createElement("td") : args[0]);
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLTableCellElement);
            // constructor(value: any);
            if (args[0] instanceof HTMLTableCellElement) {
            } else {
                var value: any = args[0];
                this.setValue(value);
            }
            break;
        default:
        }
        this.setClass("JSTableDataCell");
        this.setStyle("border", "1px solid gray");
        this.setStyle("border-collapse", "collapse");
    }
    getValue(): any {
        return this.getData("value") || this.getText();
    }
    setValue(value: any) {
        if (typeof value === "string") {
            this.setText(value);
        } else {
            this.setText("" + value);
            this.setData("value", value);
        }
    }
}
