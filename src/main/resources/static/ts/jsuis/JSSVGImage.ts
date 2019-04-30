/// <reference path = "../jsuis.ts"/>
/**
 * JSSVGImage
 * 
 * @author Yassuo Toda
 */
class JSSVGImage extends JSSVGComponent {
    
    constructor();
    constructor(element: SVGImageElement);
    constructor(icon: JSIcon);
    constructor(source: string);
    constructor(source: string, width: number, height: number);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof SVGImageElement) ? document.createElementNS("http://www.w3.org/2000/svg", "image") : args[0]);
        this.setClass("JSSVGImage");
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: SVGImageElement);
            // constructor(source: string);
            if (args[0] instanceof HTMLDivElement) {
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
        return this.element.getAttributeNS("http://www.w3.org/1999/xlink", "href");
    }
    setSource(source: string) {
        this.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", source);
    }
}