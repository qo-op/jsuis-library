/// <reference path = "../jsuis.ts"/>
/**
 * JSSeparator
 * 
 * @author Yassuo Toda
 */
class JSSeparator extends JSHTMLComponent {
    
    orientation: string = JSSeparator.HORIZONTAL;
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(orientation: string);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLDivElement);
            // constructor(selected: boolean);
            if (args[0] instanceof HTMLDivElement) {
            } else if (typeof args[0] === "string") {
                var orientation: string = args[0];
                this.setOrientation(orientation);
            }
            break;
        default:
        }
        var line = this.getLine();
        if (!line) {
            line = new JSDiv();
            var orientation = this.getOrientation();
            if (orientation === JSSeparator.VERTICAL) {
                line.setWidth(4);
                line.setStyle("border-right", "1px solid gray");
                this.setStyle("padding-right", "4px");
            } else {
                line.setHeight(4);
                line.setStyle("border-bottom", "1px solid gray");
                this.setStyle("padding-bottom", "4px");
            }
            this.add(line);
            this.setLine(line);
        }
        this.addMouseListener(new JSMouseListener({
            mousePressed(mouseEvent: MouseEvent, component: JSComponent) {
            },
            mouseReleased(mouseEvent: MouseEvent, component: JSComponent) {
            }
        }));
        this.setClass("JSSeparator");
    }
    getLine(): JSComponent {
        return this.getData("line");
    }
    setLine(line: JSComponent) {
        this.setData("line", line);
    }
    getOrientation(): string {
        return this.getAttribute("data-orientation");
    }
    setOrientation(orientation: string) {
        this.setAttribute("data-orientation", orientation);
    }
}