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
    constructor() {
        // constructor();
        // constructor(element: SVGImageElement);
        super(arguments.length === 0 || !(arguments[0] instanceof SVGImageElement) ? document.createElementNS("http://www.w3.org/2000/svg", "image") : arguments[0]);
        this.setUI("JSSVGImage");
        switch (arguments.length) {
        case 1:
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
    /*
    setIcon(icon: JSIcon) {
        if (icon instanceof JSImageIcon || icon instanceof JSPathIcon) {
            var source: string = icon.getSource();
            if (source !== undefined) {
                this.setSource(source);
            }
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
    */
    getSource(): string {
        return this.element.getAttributeNS("http://www.w3.org/1999/xlink", "href");
    }
    setSource(source: string) {
        this.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", source);
    }
}