/// <reference path = "../jsuis.ts"/>
/**
 * JSDefs
 * 
 * @author Yassuo Toda
 */
class JSDefs extends JSSVGComponent {
    
    constructor();
    constructor(element: SVGDefsElement);
    // overload
    constructor() {
        super(arguments.length === 0 || !(arguments[0] instanceof SVGDefsElement) ? document.createElementNS("http://www.w3.org/2000/svg", "defs") : arguments[0]);
        this.setUI("JSDefs");
    }
}