/// <reference path = "../jsuis.ts"/>
/**
 * JSSVGImage
 * 
 * @author Yassuo Toda
 */
class JSSVGImage extends JSSVGComponent {
    
    constructor();
    constructor(element: SVGImageElement);
    constructor(location: string);
    constructor(width: number, height: number);
    constructor(location: string, width: number, height: number);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof SVGImageElement) ? document.createElementNS("http://www.w3.org/2000/svg", "image") : args[0]);
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: SVGImageElement);
            // constructor(location: string);
            if (args[0] instanceof HTMLDivElement) {
            } else if (typeof args[0] === "string") {
                var location: string = args[0];
                this.setLocation(location);
            }
            break;
        case 2:
            // constructor(width: number, height: number);
            if (typeof args[0] === "number" && typeof args[1] === "number") {
                var width: number = args[0];
                var height: number = args[1];
                this.setWidth(width);
                this.setHeight(height);
            }
            break;
        case 3:
            // constructor(location: string, width: number, height: number);
            if (typeof args[0] === "string" && typeof args[1] === "number" && typeof args[2] === "number") {
                var location: string = args[0];
                var width: number = args[1];
                var height: number = args[2];
                this.setLocation(location);
                this.setWidth(width);
                this.setHeight(height);
            }
            break;
        default:
        }
        this.setClass("JSSVGImage");
    }
    getPreferredWidth(): number {
        var preferredWidth: string = this.getAttribute("data-preferred-width");
        if (preferredWidth) {
            return +preferredWidth;
        }
        return this.getWidth();
    }
    getPreferredHeight(): number {
        var preferredHeight: string = this.getAttribute("data-preferred-height");
        if (preferredHeight) {
            return +preferredHeight;
        }
        return this.getHeight();
    }
    getLocation(): string {
        return this.element.getAttributeNS("http://www.w3.org/1999/xlink", "href");
    }
    setLocation(location: string) {
        this.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", location);
    }
}