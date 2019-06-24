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
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setUI("JSTableHorizontalScrollPane");
        this.setVsbPolicy(JSScrollPane.VERTICAL_SCROLLBAR_NEVER);
        this.setHsbPolicy(JSScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
    }
}