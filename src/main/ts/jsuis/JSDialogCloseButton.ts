/// <reference path = "../jsuis.ts"/>
/**
 * JSDialogCloseButton
 * 
 * @author Yassuo Toda
 */
class JSDialogCloseButton extends JSButton {
    
    static CLOSE_ICON: JSPathIcon = new JSPathIcon("M0,0L12,12M12,0L0,12", 12, 12);
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLButtonElement) ? document.createElement("button") : arguments[0]);
        this.setUI("JSDialogCloseButton");
        this.setIcon(JSDialogCloseButton.CLOSE_ICON);
    }
}
