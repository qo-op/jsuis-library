/// <reference path = "../jsuis.ts"/>
/**
 * JSSplitPaneLeftContainer
 * 
 * @author Yassuo Toda
 */
class JSSplitPaneLeftContainer extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSSplitPaneLeftContainer");
        this.setLayout(new JSBorderLayout());
    }
}