/// <reference path = "../jsuis.ts"/>
/**
 * JSDialogTitlePanel
 * 
 * @author Yassuo Toda
 */
class JSDialogTitlePanel extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setLayout(new JSBorderLayout());
    }
    
    init(): void {
        this.addClass("JSDialogTitlePanel");
    }
}