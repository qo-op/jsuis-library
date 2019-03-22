/// <reference path = "../jsuis.ts"/>
class JSTableDataCell extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLTableCellElement);
    constructor(value: any);
    // overload
    constructor(elementOrValue?: HTMLTableCellElement) {
        // constructor();
        // constructor(element: HTMLTableCellElement);
        super(elementOrValue === undefined || !(elementOrValue instanceof HTMLTableCellElement) ? document.createElement("td") : elementOrValue);
        if (elementOrValue !== undefined && !(elementOrValue instanceof HTMLTableCellElement)) {
            // constructor(value: any);
            this.setValue(elementOrValue);
        }
    }
    init(): void {
        this.addClass("JSTableDataCell");
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
