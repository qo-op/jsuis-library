/// <reference path = "../jsuis.ts"/>
/**
 * JSSVGComponent
 * 
 * @author Yassuo Toda
 */
class JSSVGComponent extends JSComponent {
    
    constructor(element: SVGElement) {
        super(element);
        this.setClass("JSSVGComponent");
    }
    getAttributeNS(attribute: string): string {
        return this.element.getAttributeNS(null, attribute);
    }
    setAttributeNS(attribute: string, value: string): void {
        this.element.setAttributeNS(null, attribute, value);
    }
    removeAttributeNS(attribute: string): void {
        this.element.removeAttributeNS(null, attribute);
    }
    
    getX(): number {
        return +this.getAttribute("x");
    }
    getY(): number {
        return +this.getAttribute("y");
    }
    getWidth(): number {
        return this.element.getBoundingClientRect().width;
    }
    getHeight(): number {
        return this.element.getBoundingClientRect().height;
    }
    
    protected setXPixels(xPixels: number) {
        super.setXPixels(xPixels);
        var xPercent = this.getXPercent();
        if (xPercent) {
            this.setAttribute("x", "calc(" + xPercent + "% + " + xPixels + ")");
        } else {
            this.setAttribute("x", xPixels + "");
        }
    }
    protected setYPixels(yPixels: number) {
        super.setYPixels(yPixels);
        var yPercent = this.getYPercent();
        if (yPercent) {
            this.setAttribute("y", "calc(" + yPercent + "% + " + yPixels + ")");
        } else {
            this.setAttribute("y", yPixels + "");
        }
    }
    protected setXPercent(xPercent: number) {
        super.setXPercent(xPercent);
        var xPixels = this.getXPixels();
        if (xPixels) {
            this.setAttribute("x", "calc(" + xPercent + "% + " + xPixels + ")");
        } else {
            this.setAttribute("x", xPercent + "%");
        }
    }
    protected setYPercent(yPercent: number) {
        super.setYPercent(yPercent);
        var yPixels = this.getYPixels();
        if (yPixels) {
            this.setAttribute("y", "calc(" + yPercent + "% + " + yPixels + ")");
        } else {
            this.setAttribute("y", yPercent + "%");
        }
    }
    protected setWidthPixels(widthPixels: number) {
        super.setWidthPixels(widthPixels);
        var widthPercent = this.getWidthPercent();
        if (widthPercent) {
            this.setAttribute("width", "calc(" + widthPercent + "% + " + widthPixels + ")");
        } else {
            this.setAttribute("width", widthPixels + "");
        }
    }
    protected setHeightPixels(heightPixels: number) {
        super.setHeightPixels(heightPixels);
        var heightPercent = this.getHeightPercent();
        if (heightPercent) {
            this.setAttribute("height", "calc(" + heightPercent + "% + " + heightPixels + ")");
        } else {
            this.setAttribute("height", heightPixels + "");
        }
    }
    protected setWidthPercent(widthPercent: number) {
        super.setWidthPercent(widthPercent);
        var widthPixels = this.getWidthPixels();
        if (widthPixels) {
            this.setAttribute("width", "calc(" + widthPercent + "% + " + widthPixels + ")");
        } else {
            this.setAttribute("width", widthPercent + "%");
        }
    }
    protected setHeightPercent(heightPercent: number) {
        super.setHeightPercent(heightPercent);
        var heightPixels = this.getHeightPixels();
        if (heightPixels) {
            this.setAttribute("height", "calc(" + heightPercent + "% + " + heightPixels + ")");
        } else {
            this.setAttribute("height", heightPercent + "%");
        }
    }
    
    getPreferredOuterWidth(): number {
        return this.getPreferredWidth();
    }
    getPreferredOuterHeight(): number {
        return this.getPreferredHeight();
    }
    getBackground(): string {
        return this.getAttribute("fill");
    }
    setBackground(background: string) {
        this.setAttribute("fill", background);
    }
    getForeground(): string {
        return this.getAttribute("stroke");
    }
    setForeground(foreground: string) {
        this.setAttribute("stroke", foreground);
    }
    getOpacity(): number {
        return +this.getAttribute("opacity");
    }
    setOpacity(opacity: number) {
        this.setAttribute("opacity", "" + opacity);
    }
}