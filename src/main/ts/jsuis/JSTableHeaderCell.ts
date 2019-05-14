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
        // constructor();
        // constructor(element: HTMLTableCellElement);
        super(args.length === 0 || !(args[0] instanceof HTMLTableCellElement) ? document.createElement("th") : args[0]);
        var container: JSDiv = this.getContainer();
        this.add(container);
        switch (args.length) {
        case 1:
            // constructor(text: string);
            if (typeof args[0] === "string") {
                var text: string = args[0];
                this.setText(text);
            }
            break;
        default:
        }
    }
    init(): void {
        this.addClass("JSTableHeaderCell");
    }
    getContainer(): JSDiv {
        var container = this.getData("container");
        if (!container) {
            container = new JSDiv();
            this.setData("container", container);
        }
        return container;
    }
    getText(): string {
        var container: JSDiv = this.getContainer();
        return container.getText();
    }
    setText(text: string) {
        var container: JSDiv = this.getContainer();
        container.setText(text);
    }
}
