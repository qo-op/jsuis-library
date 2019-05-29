/// <reference path = "../jsuis.ts"/>
/**
 * JSImage
 * 
 * @author Yassuo Toda
 */
class JSImage extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    // constructor(icon: JSIcon);
    constructor(source: string);
    constructor(source: string, width: number, height: number);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLImageElement) ? document.createElement("img") : args[0]);
        this.setStyle("draggable", "false");
        this.setStyle("-webkit-user-drag", "none");
        switch (args.length) {
        case 0:
            break;
        case 1:
            // constructor(icon: JSIcon);
            // constructor(source: string);
            if (args[0] instanceof JSIcon) {
                var icon: JSIcon = args[0];
                this.setIcon(icon);
            } else if (typeof args[0] === "string") {
                var source: string = args[0];
                this.setSource(source);
            }
            break;
        case 3:
            // constructor(source: string, width: number, height: number);
            if (typeof args[0] === "string" && typeof args[1] === "number" && typeof args[2] === "number") {
                var source: string = args[0];
                var width: number = args[1];
                var height: number = args[2];
                this.setSource(source);
                this.setWidth(width);
                this.setHeight(height);
            }
            break;
        default:
        }
    }
    init(): void {
        this.addClass("JSImage");
    }
    getSource(): string {
        return this.getAttribute("src");
    }
    setSource(source: string) {
        this.setAttribute("src", source);
    }
}