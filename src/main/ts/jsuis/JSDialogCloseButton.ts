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
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLButtonElement) ? document.createElement("button") : args[0]);
        this.setIcon(JSDialogCloseButton.CLOSE_ICON);
    }
    init(): void {
        this.addClass("JSDialogCloseButton");
    }
}
