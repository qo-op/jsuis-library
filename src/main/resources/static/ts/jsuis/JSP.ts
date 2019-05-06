/// <reference path = "../jsuis.ts"/>
/**
 * JSP
 * 
 * @author Yassuo Toda
 */
class JSP extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLParagraphElement);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLParagraphElement) ? document.createElement("p") : args[0]);
    }
    init(): void {
        this.addClass("JSP");
    }
}