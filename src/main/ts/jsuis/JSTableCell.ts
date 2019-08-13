/// <reference path = "../jsuis.ts"/>
/**
 * JSTableCell
 * 
 * @author Yassuo Toda
 */
class JSTableCell extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(value: any);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLTableCellElement) ? document.createElement("td") : arguments[0]);
        this.setUI("JSTableCell");
        switch (arguments.length) {
        case 1:
            // constructor(value: any);
            if (!(arguments[0] instanceof HTMLTableCellElement)) {
                var value: any = arguments[0];
                this.setValue(value);
            }
            break;
        default:
        }
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
