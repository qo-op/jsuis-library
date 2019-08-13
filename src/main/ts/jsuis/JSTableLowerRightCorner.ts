/// <reference path = "../jsuis.ts"/>
/**
 * JSTableLowerRightCorner
 * 
 * @author Yassuo Toda
 */
class JSTableLowerRightCorner extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSTableLowerRightCorner");
        
        this.setVsbPolicy(JSTableLowerRightCorner.VERTICAL_SCROLLBAR_ALWAYS);
        this.setHsbPolicy(JSTableLowerRightCorner.HORIZONTAL_SCROLLBAR_ALWAYS);
    }
    getVsbPolicy(): string {
        return this.getStyle("overflow-y");
    }
    setVsbPolicy(vsbPolicy: string) {
        this.setStyle("overflow-y", vsbPolicy);
    }
    getHsbPolicy(): string {
        return this.getStyle("overflow-x");
    }
    setHsbPolicy(hsbPolicy: string) {
        this.setStyle("overflow-x", hsbPolicy);
    }
}
