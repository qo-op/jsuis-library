/// <reference path = "../jsuis.ts"/>
/**
 * JSImage
 * 
 * @author Yassuo Toda
 */
class JSImage extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLImageElement);
    constructor(icon: JSIcon);
    constructor(source: string);
    constructor(source: string, width: number, height: number);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLImageElement) ? document.createElement("img") : args[0]);
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLImageElement);
            // constructor(icon: JSIcon);
            // constructor(source: string);
            if (args[0] instanceof HTMLImageElement) {
            } else if (args[0] instanceof JSIcon) {
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
    setIcon(icon: JSIcon) {
        var source: string = icon.getSource();
        if (source !== undefined) {
            this.setSource(source);
        }
        var iconWidth: number = icon.getIconWidth();
        if (iconWidth !== undefined) {
            this.setWidth(iconWidth);
        }
        var iconHeight: number = icon.getIconHeight();
        if (iconHeight !== undefined) {
            this.setHeight(iconHeight);
        }
    }
    getSource(): string {
        return this.getAttribute("src");
    }
    setSource(source: string) {
        this.setAttribute("src", source);
    }
}