/// <reference path = "../jsuis.ts"/>
/**
 * JSBodyDefsContainer
 * 
 * @author Yassuo Toda
 */
class JSBodyDefsContainer extends JSSVG {
    
    constructor();
    constructor(element: SVGElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: SVGElement);
        super(args.length === 0 || !(args[0] instanceof SVGSVGElement) ? document.createElementNS("http://www.w3.org/2000/svg", "svg") : args[0]);
        this.setPreferredHeight(0);
    }
    init(): void {
        this.addClass("JSBodyDefsContainer");
    }
}
