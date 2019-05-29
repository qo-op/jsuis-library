/// <reference path = "../jsuis.ts"/>
/**
 * JSSVGComponent
 * 
 * @author Yassuo Toda
 */
class JSSVGComponent extends JSComponent {
    
    constructor(element: SVGElement) {
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
    
    getWidth(): number {
        var width = super.getWidth();
        if (width !== undefined) {
            return width;
        }
        return this.element.getBoundingClientRect().width;
    }
    getHeight(): number {
        var height = super.getHeight();
        if (height !== undefined) {
            return height;
        }
        return this.element.getBoundingClientRect().height;
    }
    
    setX(x: number): void {
        super.setX(x);
        this.setAttribute("x", x + "");
    }
    setY(y: number): void {
        super.setY(y);
        this.setAttribute("y", y + "");
    }
    
    setWidth(width: number): void {
        this.setAttribute("width", width + "px");
        super.setWidth(width);
    }
    setOuterWidth(outerWidth: number): void {
        this.setWidth(outerWidth - this.getMarginLeft() - this.getBorderLeftWidth() - this.getPaddingLeft() -
                this.getPaddingRight() - this.getBorderRightWidth() - this.getMarginRight());
    }
    setHeight(height: number): void {
        this.setAttribute("height", height + "px");
        super.setHeight(height);
    }
    setOuterHeight(outerHeight: number): void {
        this.setHeight(outerHeight - this.getMarginTop() - this.getBorderTopWidth() - this.getPaddingTop() -
                this.getPaddingBottom() - this.getBorderBottomWidth() - this.getMarginBottom());
    }
    
    getPreferredWidth(): number {
        var preferredWidth: string = this.getAttribute("data-preferred-width");
        if (preferredWidth) {
            return +preferredWidth;
        }
        var layout: JSLayout = this.getLayout();
        if (layout) {
            return layout.preferredLayoutWidth(this);
        }
        var widthAttribute: string = this.getAttribute("width");
        if (widthAttribute) {
            this.removeAttribute("width");
        }
        var width = this.element.getBoundingClientRect().width - this.getBorderLeftWidth() - this.getPaddingLeft() - this.getPaddingRight() - this.getBorderRightWidth();
        if (widthAttribute) {
            this.setAttribute("width", widthAttribute);
        }
        return width;
    }
    getPreferredHeight(): number {
        var preferredHeight: string = this.getAttribute("data-preferred-height");
        if (preferredHeight) {
            return +preferredHeight;
        }
        var layout: JSLayout = this.getLayout();
        if (layout) {
            return layout.preferredLayoutHeight(this);
        }
        var heightAttribute: string = this.getAttribute("height");
        if (heightAttribute) {
            this.removeAttribute("height");
        }
        var height = this.element.getBoundingClientRect().height - this.getBorderTopWidth() - this.getPaddingTop() - this.getPaddingBottom() - this.getBorderBottomWidth();
        if (heightAttribute) {
            this.setAttribute("height", heightAttribute);
        }
        return height;
    }
    
    getFill(): string {
        return this.getAttribute("fill");
    }
    setFill(fill: string) {
        this.setAttribute("fill", fill);
    }
    getStroke(): string {
        return this.getAttribute("stroke");
    }
    setStroke(stroke: string) {
        this.setAttribute("stroke", stroke);
    }
    getOpacity(): number {
        return +this.getAttribute("opacity");
    }
    setOpacity(opacity: number) {
        this.setAttribute("opacity", "" + opacity);
    }
}