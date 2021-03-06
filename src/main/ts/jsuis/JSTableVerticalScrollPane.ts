/// <reference path = "../jsuis.ts"/>
/**
 * JSTableVerticalScrollPane
 * 
 * @author Yassuo Toda
 */
class JSTableVerticalScrollPane extends JSScrollPane {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSTableVerticalScrollPane");
        this.setVerticalScrollBarPolicy(JSScrollPane.VERTICAL_SCROLLBAR_NEVER);
        this.setHorizontalScrollBarPolicy(JSScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
    }
}