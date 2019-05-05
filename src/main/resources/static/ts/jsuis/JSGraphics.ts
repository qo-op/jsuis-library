/// <reference path = "../jsuis.ts"/>
/**
 * JSGraphics
 * 
 * @author Yassuo Toda
 */
class JSGraphics extends JSSVGComponent {
    
    constructor();
    constructor(element: SVGSVGElement);
    constructor(width: number, height: number);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: SVGSVGElement);
        super(args.length === 0 || !(args[0] instanceof SVGSVGElement) ? document.createElementNS("http://www.w3.org/2000/svg", "svg") : args[0]);
        this.setClass("JSGraphics");
        this.setStyle("display", "inline-block");
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: SVGSVGElement);
            if (args[0] instanceof SVGSVGElement) {
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
        default:
        }
    }
    getX(): number {
        return +this.getComputedStyle("left").replace("px", "");
    }
    getY(): number {
        return +this.getComputedStyle("top").replace("px", "");
    }
    protected setXPixels(xPixels: number) {
        super.setXPixels(xPixels);
        var xPercent = this.getXPercent();
        if (xPercent) {
            this.setStyle("left", "calc(" + xPercent + "% + " + xPixels + "px)");
        } else {
            this.setStyle("left", xPixels + "px");
        }
    }
    protected setYPixels(yPixels: number) {
        super.setYPixels(yPixels);
        var yPercent = this.getYPercent();
        if (yPercent) {
            this.setStyle("top", "calc(" + yPercent + "% + " + yPixels + "px)");
        } else {
            this.setStyle("top", yPixels + "px");
        }
    }
    protected setXPercent(xPercent: number) {
        super.setXPercent(xPercent);
        var xPixels = this.getXPixels();
        if (xPixels) {
            this.setStyle("left", "calc(" + xPercent + "% + " + xPixels + "px)");
        } else {
            this.setStyle("left", xPercent + "%");
        }
    }
    protected setYPercent(yPercent: number) {
        super.setYPercent(yPercent);
        var yPixels = this.getYPixels();
        if (yPixels) {
            this.setStyle("top", "calc(" + yPercent + "% + " + yPixels + "px)");
        } else {
            this.setStyle("top", yPercent + "%");
        }
    }
    getPreferredWidth(): number {
        return this.getWidth();
    }
    getPreferredHeight(): number {
        return this.getHeight();
    }
}