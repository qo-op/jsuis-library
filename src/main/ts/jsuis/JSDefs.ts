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
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof SVGDefsElement) ? document.createElementNS("http://www.w3.org/2000/svg", "defs") : args[0]);
        this.setUI("JSDefs");
    }
}