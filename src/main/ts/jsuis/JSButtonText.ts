/// <reference path = "../jsuis.ts"/>
/**
 * JSButtonText
 * 
 * @author Yassuo Toda
 */
class JSButtonText extends JSSpan {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLSpanElement) ? document.createElement("span") : arguments[0]);
        this.setUI("JSButtonText");
        this.setAlign(JSBorderLayout.CENTER);
        this.setStyle("display", "none");
    }
}
