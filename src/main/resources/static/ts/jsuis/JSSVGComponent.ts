/// <reference path = "../jsuis.ts"/>
class JSSVGComponent extends JSComponent {
    
    constructor();
    constructor(element: SVGElement);
    // overload
    constructor(element?: SVGElement) {
        // constructor();
        // constructor(element: SVGElement);
        super(element);
    }
    init(): void {
        this.addClass("JSSVGComponent");
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
    setX(x: number) {
        this.setAttribute("x", "" + x);
    }
    getY(): number {
        return +this.getAttribute("y");
    }
    setY(y: number) {
        this.setAttribute("y", "" + y);
    }
    getWidth(): number {
        return this.width || this.element.getBoundingClientRect().width;
    }
    setWidth(width: number) {
        this.oldWidth = this.width;
        this.setAttribute("width", "" + width);
        this.width = width;
    }
    getHeight(): number {
        return this.height || this.element.getBoundingClientRect().height;
    }
    setHeight(height: number) {
        this.oldHeight = this.height;
        this.setAttribute("height", "" + height);
        this.height = height;
    }
    getOuterWidth(): number {
        return this.getWidth();
    }
    setOuterWidth(outerWidth: number) {
        this.setWidth(outerWidth);
    }
    getOuterHeight(): number {
        return this.getHeight();
    }
    setOuterHeight(outerHeight: number) {
        this.setHeight(outerHeight);
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