/// <reference path = "../jsuis.ts"/>
class JSSVGImage extends JSSVGComponent {
    
    constructor();
    constructor(element: SVGImageElement);
    constructor(width: number, height: number);
    constructor(location: string);
    constructor(location: string, width: number, height: number);
    // overload
    constructor(elementOrWidthOrLocation?: SVGImageElement | number | string, heightOrWidth?: number, height?: number) {
        // constructor();
        // constructor(element: SVGImageElement);
        super(elementOrWidthOrLocation === undefined || !(elementOrWidthOrLocation instanceof SVGImageElement) ? document.createElementNS("http://www.w3.org/2000/svg", "image") : elementOrWidthOrLocation);
        if (elementOrWidthOrLocation !== undefined && !(elementOrWidthOrLocation instanceof SVGImageElement)) {
            if (typeof elementOrWidthOrLocation === "number") {
                // constructor(width: number, height: number);
                this.setWidth(elementOrWidthOrLocation);
                this.setHeight(heightOrWidth);
            } else {
                // constructor(location: string);
                // constructor(location: string, width: number, height: number);
                this.setLocation(elementOrWidthOrLocation);
                if (heightOrWidth !== undefined) {
                    this.setWidth(heightOrWidth);
                    this.setHeight(height);
                }
            }
        }
    }
    init(): void {
        this.addClass("JSSVGImage");
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