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
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setUI("JSTableVerticalScrollPane");
        this.setVsbPolicy(JSScrollPane.VERTICAL_SCROLLBAR_NEVER);
        this.setHsbPolicy(JSScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
    }
}