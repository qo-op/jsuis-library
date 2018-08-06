/// <reference path = "../jsuis.ts"/>
class JSTableHeaderCell extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLTableCellElement);
    constructor(text: string);
    // overload
    constructor(elementOrText?: HTMLTableCellElement | string) {
        // constructor();
        // constructor(element: HTMLTableCellElement);
        super(elementOrText === undefined || !(elementOrText instanceof HTMLTableCellElement) ? document.createElement("th") : elementOrText);
        var div: JSDiv = this.getDiv();
        if (!div) {
            div = new JSDiv();
            div.setStyle("outline", "1px solid gray");
            this.add(div);
            this.setDiv(div);
        }
        if (elementOrText !== undefined && !(elementOrText instanceof HTMLTableCellElement)) {
            // constructor(text: string);
            div.setText(elementOrText);
        }
    }
    init(): void {
        this.addClass("JSTableHeaderCell");
        this.setStyle("border-collapse", "collapse");
    }
    getDiv(): JSDiv {
        return this.getData("div");
    }
    setDiv(div: JSDiv) {
        this.setData("div", div);
    }
}
