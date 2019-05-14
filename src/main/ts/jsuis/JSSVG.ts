/// <reference path = "../jsuis.ts"/>
/**
 * JSSVG
 * 
 * @author Yassuo Toda
 */
class JSSVG extends JSSVGComponent {
    
    constructor();
    constructor(element: SVGSVGElement);
    constructor(width: number, height: number);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: SVGSVGElement);
        super(args.length === 0 || !(args[0] instanceof SVGSVGElement) ? document.createElementNS("http://www.w3.org/2000/svg", "svg") : args[0]);
        switch (args.length) {
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
    init(): void {
        this.addClass("JSSVG");
    }
    setX(x: number) {
        this.setStyle("left", x + "px");
    }
    setY(y: number) {
        this.setStyle("top", y + "px");
    }
    /* Quarantine
    getPreferredWidth(): number {
        return this.getWidth();
    }
    getPreferredHeight(): number {
        return this.getHeight();
    }
    */
    getViewBox(): string {
        return this.getAttribute("viewBox");
    }
    setViewBox(viewBox: string) {
        this.setAttribute("viewBox", viewBox);
    }
}