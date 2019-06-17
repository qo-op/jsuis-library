/// <reference path = "../jsuis.ts"/>
/**
 * JSSeparator
 * 
 * @author Yassuo Toda
 */
class JSSeparator extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(orientation: string);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setUI("JSSeparator");
        
        switch (args.length) {
        case 0:
            this.setOrientation(JSComponent.HORIZONTAL);
            break;
        case 1:
            // constructor(selected: boolean);
            if (args[0] instanceof HTMLElement) {
                this.setOrientation(JSComponent.HORIZONTAL);
            } else if (typeof args[0] === "string") {
                var orientation: string = args[0];
                this.setOrientation(orientation);
            }
            break;
        default:
        }
        
        this.addMouseListener({
            mousePressed(mouseEvent: MouseEvent) {
                mouseEvent.stopPropagation();
            },
            mouseReleased(mouseEvent: MouseEvent) {
                mouseEvent.stopPropagation();
            }
        });
    }
    getOrientation(): string {
        return this.getAttribute("data-orientation");
    }
    setOrientation(orientation: string) {
        this.setAttribute("data-orientation", orientation);
        if (orientation === JSComponent.VERTICAL) {
            var verticalLine: JSSeparatorVerticalLine = this.getVerticalLine();
            this.removeAll();
            this.add(verticalLine);
        } else {
            var horizontalLine: JSSeparatorHorizontalLine = this.getHorizontalLine();
            this.removeAll();
            this.add(horizontalLine);
        }
    }
    getHorizontalLine(): JSSeparatorHorizontalLine {
        var horizontalLine: JSSeparatorHorizontalLine = this.getData("horizontalLine");
        if (!horizontalLine) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSSeparatorHorizontalLine");
            if (element) {
                horizontalLine = new JSSeparatorHorizontalLine(element);
            } else {
                horizontalLine = new JSSeparatorHorizontalLine();
            }
            this.setData("horizontalLine", horizontalLine);
        }
        return horizontalLine;
    }
    getVerticalLine(): JSSeparatorVerticalLine {
        var verticalLine: JSSeparatorVerticalLine = this.getData("verticalLine");
        if (!verticalLine) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSSeparatorVerticalLine");
            if (element) {
                verticalLine = new JSSeparatorVerticalLine(element);
            } else {
                verticalLine = new JSSeparatorVerticalLine();
            }
            this.setData("verticalLine", verticalLine);
        }
        return verticalLine;
    }
}