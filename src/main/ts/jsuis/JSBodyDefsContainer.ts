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
    constructor() {
        // constructor();
        // constructor(element: SVGElement);
        super(arguments.length === 0 || !(arguments[0] instanceof SVGSVGElement) ? document.createElementNS("http://www.w3.org/2000/svg", "svg") : arguments[0]);
        this.setUI("JSBodyDefsContainer");
        this.setPreferredHeight(0);
    }
}
