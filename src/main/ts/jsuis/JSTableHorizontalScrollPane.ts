/// <reference path = "../jsuis.ts"/>
/**
 * JSTableHorizontalScrollPane
 * 
 * @author Yassuo Toda
 */
class JSTableHorizontalScrollPane extends JSScrollPane {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSTableHorizontalScrollPane");
        this.setVsbPolicy(JSScrollPane.VERTICAL_SCROLLBAR_NEVER);
        this.setHsbPolicy(JSScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
    }
}