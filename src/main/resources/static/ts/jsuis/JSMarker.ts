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
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: SVGMarkerElement);
        super(args.length === 0 || !(args[0] instanceof SVGMarkerElement) ? document.createElementNS("http://www.w3.org/2000/svg", "marker") : args[0]);
    }
    init(): void {
        this.addClass("JSMarker");
    }
}