/// <reference path = "../jsuis.ts"/>
/**
 * JSBodyDragContainer
 * 
 * @author Yassuo Toda
 */
class JSBodyDragContainer extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSBodyDragContainer");
        this.setPreferredHeight(0);
        this.setLayer(JSLayeredPane.DRAG_LAYER);
    }
}