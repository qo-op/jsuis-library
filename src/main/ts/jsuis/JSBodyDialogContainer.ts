/// <reference path = "../jsuis.ts"/>
/**
 * JSBodyDialogContainer
 * 
 * @author Yassuo Toda
 */
class JSBodyDialogContainer extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSBodyDialogContainer");
        this.setPreferredHeight(0);
        this.setLayer(JSLayeredPane.MODAL_LAYER);
    }
}