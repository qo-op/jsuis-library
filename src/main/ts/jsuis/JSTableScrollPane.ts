/// <reference path = "../jsuis.ts"/>
/**
 * JSTableScrollPane
 * 
 * @author Yassuo Toda
 */
class JSTableScrollPane extends JSScrollPane {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSTableScrollPane");
    }
}
