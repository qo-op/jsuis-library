/// <reference path = "../jsuis.ts"/>
/**
 * JSTableHeadCell
 * 
 * @author Yassuo Toda
 */
class JSTableHeadCell extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(text: string);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLTableCellElement) ? document.createElement("th") : arguments[0]);
        this.setUI("JSTableHeadCell");
        
        var container: JSPanel = this.getContainer();
        this.add(container);
        
        switch (arguments.length) {
        case 1:
            // constructor(text: string);
            if (typeof arguments[0] === "string") {
                var text: string = arguments[0];
                this.setText(text);
            }
            break;
        default:
        }
    }
    getContainer(): JSPanel {
        var container = this.getData("container");
        if (!container) {
            container = new JSPanel();
            this.setData("container", container);
        }
        return container;
    }
    getText(): string {
        var container: JSPanel = this.getContainer();
        return container.getText();
    }
    setText(text: string) {
        var container: JSPanel = this.getContainer();
        container.setText(text);
    }
}
