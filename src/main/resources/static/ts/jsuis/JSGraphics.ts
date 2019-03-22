/// <reference path = "../jsuis.ts"/>
class JSGraphics extends JSSVGComponent {
    
    constructor();
    constructor(element: SVGSVGElement);
    constructor(width: number, height: number);
    // overload
    constructor(elementOrWidth?: SVGSVGElement | number, height?: number) {
        // constructor();
        // constructor(element: SVGSVGElement);
        super(elementOrWidth === undefined || !(elementOrWidth instanceof SVGSVGElement) ? document.createElementNS("http://www.w3.org/2000/svg", "svg") : elementOrWidth);
        if (elementOrWidth !== undefined && !(elementOrWidth instanceof SVGSVGElement)) {
            // constructor(width: number, height: number);
            this.setWidth(elementOrWidth);
            this.setHeight(height);
        }
    }
    init(): void {
        this.addClass("JSGraphics");
        this.setStyle("display", "inline-block");
    }
}