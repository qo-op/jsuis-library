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
        this.setClass("JSTableHeaderCell");
        this.setStyle("outline", "1px solid gray");
        this.setStyle("outline-offset", "-1px");
        this.setStyle("border-collapse", "collapse");
        var div: JSDiv = this.getDiv();
        if (!div) {
            div = new JSDiv();
            this.add(div);
            this.setDiv(div);
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
                div.setText(text);
            }
            break;
        default:
        }
    }
    getDiv(): JSDiv {
        return this.getData("div");
    }
    setDiv(div: JSDiv) {
        this.setData("div", div);
    }
}
