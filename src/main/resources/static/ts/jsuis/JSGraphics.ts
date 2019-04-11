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
        this.setClass("JSGraphics");
        this.setStyle("display", "inline-block");
    }
}