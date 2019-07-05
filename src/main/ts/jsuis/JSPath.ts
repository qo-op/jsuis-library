/// <reference path = "../jsuis.ts"/>
/**
 * JSPath
 * 
 * @author Yassuo Toda
 */
class JSPath extends JSSVGComponent {
    
    constructor();
    constructor(element: SVGElement);
    constructor(definition: string);
    // overload
    constructor() {
        // constructor();
        // constructor(element: SVGElement);
        super(arguments.length === 0 || !(arguments[0] instanceof SVGPathElement) ? document.createElementNS("http://www.w3.org/2000/svg", "path") : arguments[0]);
        this.setUI("JSPath");
        switch (arguments.length) {
        case 1:
            // constructor(definition: string);
            if (typeof arguments[0] === "string") {
                var definition: string = arguments[0];
                this.setDefinition(definition);
            }
            break;
        default:
        }
    }
    getDefinition(): string {
        return this.getAttributeNS("d");
    }
    setDefinition(definition: string) {
        this.setAttributeNS("d", definition);
    }
}