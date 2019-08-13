/// <reference path = "../jsuis.ts"/>
/**
 * JSTabCloseButton
 * 
 * @author Yassuo Toda
 */
class JSTabCloseButton extends JSButton {
    
    static CLOSE_ICON: JSPathIcon = new JSPathIcon("M0,0L8,8M8,0L0,8", 8, 8).withStroke("red");
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLButtonElement) ? document.createElement("button") : arguments[0]);
        this.setUI("JSTabCloseButton");
        this.setIcon(JSTabCloseButton.CLOSE_ICON);
    }
}
