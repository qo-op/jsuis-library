/// <reference path = "../jsuis.ts"/>
/**
 * JSBodyDragImageContainer
 * 
 * @author Yassuo Toda
 */
class JSBodyDragImageContainer extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setPreferredHeight(0);
    }
    init(): void {
        this.addClass("JSBodyDragImageContainer");
    }
}