/// <reference path = "../jsuis.ts"/>
class JSSeparator extends JSHTMLComponent {
    
    orientation: string = JSSeparator.HORIZONTAL;
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(orientation: string);
    // overload
    constructor(elementOrOrientation?: HTMLDivElement | string) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(elementOrOrientation === undefined || !(elementOrOrientation instanceof HTMLDivElement) ? document.createElement("div") : elementOrOrientation);
        if (elementOrOrientation !== undefined && !(elementOrOrientation instanceof HTMLDivElement)) {
            // constructor(orientation: string);
            this.setOrientation(elementOrOrientation);
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
    }
    init(): void {
        this.addClass("JSSeparator");
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