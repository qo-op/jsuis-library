/// <reference path = "../jsuis.ts"/>
class JSImageIcon extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLImageElement);
    constructor(width: number, height: number);
    constructor(location: string);
    constructor(location: string, width: number, height: number);
    // overload
    constructor(elementOrWidthOrLocation?: HTMLImageElement | number | string, heightOrWidth?: number, height?: number) {
        // constructor();
        // constructor(element: HTMLImageElement);
        super(elementOrWidthOrLocation === undefined || !(elementOrWidthOrLocation instanceof HTMLImageElement) ? document.createElement("img") : elementOrWidthOrLocation);
        if (elementOrWidthOrLocation !== undefined && !(elementOrWidthOrLocation instanceof HTMLImageElement)) {
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
        this.setStyle("-webkit-user-drag", "none");
    }
    init(): void {
        this.addClass("JSImageIcon");
    }
    getWidth(): number {
        return this.width || +this.getAttribute("width");
    }
    setWidth(width: number) {
        this.oldWidth = this.width;
        this.setAttribute("width", "" + width);
        this.width = width;
    }
    getHeight(): number {
        return this.height || +this.getAttribute("height");
    }
    setHeight(height: number) {
        this.oldHeight = this.height;
        this.setAttribute("height", "" + height);
        this.height = height;
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
        return this.getAttribute("src");
    }
    setLocation(location: string) {
        this.setAttribute("src", location);
    }
    clone(): JSImageIcon {
        var clone = new JSImageIcon();
        clone.setWidth(this.getWidth());
        clone.setHeight(this.getHeight());
        clone.setLocation(this.getLocation());
        return clone;
    }
}