/// <reference path = "../jsuis.ts"/>
/**
 * JSDialogTitleLabel
 * 
 * @author Yassuo Toda
 */
class JSDialogTitleLabel extends JSLabel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setStyle("display", "block");
    }
    
    init(): void {
        this.addClass("JSDialogTitleLabel");
    }
}