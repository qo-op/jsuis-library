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
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLTableCellElement) ? document.createElement("td") : args[0]);
        switch (args.length) {
        case 1:
            // constructor(value: any);
            if (!(args[0] instanceof HTMLTableCellElement)) {
                var value: any = args[0];
                this.setValue(value);
            }
            break;
        default:
        }
    }
    init(): void {
        this.addClass("JSTableCell");
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
