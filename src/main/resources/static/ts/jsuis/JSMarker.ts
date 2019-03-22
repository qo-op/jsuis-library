/// <reference path = "../jsuis.ts"/>
class JSMarker extends JSSVGComponent {
    
    constructor();
    constructor(element: SVGMarkerElement);
    // overload
    constructor(element?: SVGMarkerElement) {
        // constructor();
        // constructor(element: SVGMarkerElement);
        super(element === undefined ? document.createElementNS("http://www.w3.org/2000/svg", "marker") : element);
    }
    init(): void {
        this.addClass("JSMarker");
    }
}