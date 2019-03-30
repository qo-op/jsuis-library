/// <reference path = "../jsuis.ts"/>
class JSPath extends JSSVGComponent {
    
    constructor();
    constructor(element: SVGPathElement);
    constructor(pathDefinition: string);
    // overload
    constructor(elementOrPathDefinition?: SVGPathElement | string) {
        // constructor();
        // constructor(element: SVGPathElement);
        super(elementOrPathDefinition === undefined || !(elementOrPathDefinition instanceof SVGPathElement) ? document.createElementNS("http://www.w3.org/2000/svg", "path") : elementOrPathDefinition);
        if (elementOrPathDefinition !== undefined && !(elementOrPathDefinition instanceof SVGPathElement)) {
            // constructor(pathDefinition: string);
            this.setPathDefinition(elementOrPathDefinition);
        }
    }
    init(): void {
        this.addClass("JSPath");
    }
    getPathDefinition(): string {
        return this.getAttributeNS("d");
    }
    setPathDefinition(pathDefinition: string) {
        this.setAttributeNS("d", pathDefinition);
    }
}