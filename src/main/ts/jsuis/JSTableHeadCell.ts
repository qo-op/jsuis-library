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
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLTableCellElement) ? document.createElement("th") : args[0]);
        this.setUI("JSTableHeadCell");
        
        var index: number = 0;
        
        var container: JSPanel = this.getContainer();
        this.add(container, null, index++);
        
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
    getContainer(): JSPanel {
        var container = this.getData("container");
        if (!container) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSPanel");
            if (element) {
                container = new JSPanel(element);
            } else {
                container = new JSPanel();
            }
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
