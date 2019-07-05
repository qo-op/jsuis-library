/// <reference path = "../jsuis.ts"/>
/**
 * JSSVG
 * 
 * @author Yassuo Toda
 */
class JSSVG extends JSSVGComponent {
    
    constructor();
    constructor(element: SVGElement);
    constructor(width: number, height: number);
    // overload
    constructor() {
        // constructor();
        // constructor(element: SVGElement);
        super(arguments.length === 0 || !(arguments[0] instanceof SVGSVGElement) ? document.createElementNS("http://www.w3.org/2000/svg", "svg") : arguments[0]);
        this.setUI("JSSVG");
        switch (arguments.length) {
        case 2:
            // constructor(width: number, height: number);
            if (typeof arguments[0] === "number" && typeof arguments[1] === "number") {
                var width: number = arguments[0];
                var height: number = arguments[1];
                this.setWidth(width);
                this.setHeight(height);
            }
            break;
        default:
        }
        this.setStyle("display", "inline-block");
    }
    setX(x: number) {
        this.setStyle("left", x + "px");
    }
    setY(y: number) {
        this.setStyle("top", y + "px");
    }
    getViewBox(): string {
        return this.getAttribute("viewBox");
    }
    setViewBox(viewBox: string) {
        this.setAttribute("viewBox", viewBox);
    }
}