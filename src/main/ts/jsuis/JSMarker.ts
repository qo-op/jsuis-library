/// <reference path = "../jsuis.ts"/>
/**
 * JSMarker
 * 
 * @author Yassuo Toda
 */
class JSMarker extends JSSVGComponent {
    
    constructor();
    constructor(element: SVGMarkerElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: SVGMarkerElement);
        super(arguments.length === 0 || !(arguments[0] instanceof SVGMarkerElement) ? document.createElementNS("http://www.w3.org/2000/svg", "marker") : arguments[0]);
        this.setUI("JSMarker");
    }
}