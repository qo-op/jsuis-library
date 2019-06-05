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
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: SVGElement);
        super(args.length === 0 || !(args[0] instanceof SVGPathElement) ? document.createElementNS("http://www.w3.org/2000/svg", "path") : args[0]);
        switch (args.length) {
        case 1:
            // constructor(definition: string);
            if (typeof args[0] === "string") {
                var definition: string = args[0];
                this.setDefinition(definition);
            }
            break;
        default:
        }
    }
    init(): void {
        this.addClass("JSPath");
    }
    getDefinition(): string {
        return this.getAttributeNS("d");
    }
    setDefinition(definition: string) {
        this.setAttributeNS("d", definition);
    }
}