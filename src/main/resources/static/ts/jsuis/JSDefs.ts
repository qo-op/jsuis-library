/// <reference path = "../jsuis.ts"/>
class JSDefs extends JSSVGComponent {
    
    constructor();
    constructor(element: SVGDefsElement);
    // overload
    constructor(element?: SVGDefsElement) {
        // constructor();
        // constructor(element: SVGDefsElement);
        super(element === undefined ? document.createElementNS("http://www.w3.org/2000/svg", "defs") : element);
    }
    init(): void {
        this.addClass("JSDefs");
    }
}