/// <reference path = "../jsuis.ts"/>
/**
 * JSBodyPopupMenuContainer
 * 
 * @author Yassuo Toda
 */
class JSBodyPopupMenuContainer extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSBodyPopupMenuContainer");
        this.setPreferredHeight(0);
        this.setLayer(JSLayeredPane.POPUP_LAYER);
    }
}