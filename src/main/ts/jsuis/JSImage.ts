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
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLImageElement) ? document.createElement("img") : arguments[0]);
        this.setUI("JSImage");
        this.setStyle("vertical-align", "middle");
        
        switch (arguments.length) {
        case 0:
            break;
        case 1:
            // constructor(icon: JSIcon);
            // constructor(source: string);
            if (arguments[0] instanceof JSIcon) {
                var icon: JSIcon = arguments[0];
                this.setIcon(icon);
            } else if (typeof arguments[0] === "string") {
                var source: string = arguments[0];
                this.setSource(source);
            }
            break;
        case 3:
            // constructor(source: string, width: number, height: number);
            if (typeof arguments[0] === "string" && typeof arguments[1] === "number" && typeof arguments[2] === "number") {
                var source: string = arguments[0];
                var width: number = arguments[1];
                var height: number = arguments[2];
                this.setSource(source);
                this.setWidth(width);
                this.setHeight(height);
            }
            break;
        default:
        }
    }
    getSource(): string {
        return this.getAttribute("src");
    }
    setSource(source: string) {
        this.setAttribute("src", source);
    }
}