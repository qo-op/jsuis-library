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
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSDialogTitlePanel");
        this.setLayout(new JSBorderLayout());
    }
}