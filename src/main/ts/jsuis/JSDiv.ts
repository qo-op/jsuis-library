/// <reference path = "../jsuis.ts"/>
/**
 * JSDiv
 * 
 * @author Yassuo Toda
 */
class JSDiv extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSDiv");
    }
    setWidth(width: number): void {
        this.setValidHorizontally(false);
        this.validateHorizontally();
    }
}
