/// <reference path = "../jsuis.ts"/>
/**
 * JSDialogContentPane
 * 
 * @author Yassuo Toda
 */
class JSDialogContentPane extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
    }
    init(): void {
        this.addClass("JSDialogContentPane");
    }
}