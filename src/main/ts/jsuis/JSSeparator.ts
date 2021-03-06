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
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSSeparator");
        
        switch (arguments.length) {
        case 0:
            this.setOrientation(JSComponent.HORIZONTAL);
            break;
        case 1:
            // constructor(selected: boolean);
            if (arguments[0] instanceof HTMLElement) {
                this.setOrientation(JSComponent.HORIZONTAL);
            } else if (typeof arguments[0] === "string") {
                var orientation: string = arguments[0];
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
        this.removeAll();
        if (orientation === JSComponent.VERTICAL) {
            var verticalLine: JSSeparatorVerticalLine = this.getVerticalLine();
            this.add(verticalLine);
        } else {
            var horizontalLine: JSSeparatorHorizontalLine = this.getHorizontalLine();
            this.add(horizontalLine);
        }
    }
    getHorizontalLine(): JSSeparatorHorizontalLine {
        var horizontalLine: JSSeparatorHorizontalLine = this.getData("horizontalLine");
        if (!horizontalLine) {
            horizontalLine = new JSSeparatorHorizontalLine();
            this.setData("horizontalLine", horizontalLine);
        }
        return horizontalLine;
    }
    getVerticalLine(): JSSeparatorVerticalLine {
        var verticalLine: JSSeparatorVerticalLine = this.getData("verticalLine");
        if (!verticalLine) {
            verticalLine = new JSSeparatorVerticalLine();
            this.setData("verticalLine", verticalLine);
        }
        return verticalLine;
    }
}