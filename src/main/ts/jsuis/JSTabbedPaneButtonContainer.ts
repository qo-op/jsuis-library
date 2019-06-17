/// <reference path = "../jsuis.ts"/>
/**
 * JSTabbedPaneButtonContainer
 * 
 * @see JSTabbedPane
 * 
 * @author Yassuo Toda
 */
class JSTabbedPaneButtonContainer extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(tabPlacement: string);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setUI("JSTabbedPaneButtonContainer");
        switch (args.length) {
        case 1:
            // constructor(tabPlacement: string);
            if (typeof args[0] === "string") {
                var tabPlacement: string = args[0];
                this.setTabPlacement(tabPlacement);
            }
            break;
        default:
        }
        var tabPlacement: string = this.getTabPlacement();
        switch (tabPlacement) {
        case JSTabbedPane.LEFT:
            this.setLayout(new JSFlowLayout(JSFlowLayout.WEST, JSFlowLayout.BOTTOM));
            this.setAlign(JSFlowLayout.TOP);
            this.setStyle("border-bottom", "1px solid darkGray");
            break;
        case JSTabbedPane.RIGHT:
            this.setLayout(new JSFlowLayout(JSFlowLayout.EAST, JSFlowLayout.BOTTOM));
            this.setAlign(JSFlowLayout.TOP);
            this.setStyle("border-bottom", "1px solid darkGray");
            break;
        case JSTabbedPane.BOTTOM:
            this.setLayout(new JSFlowLayout(JSFlowLayout.SOUTH, JSFlowLayout.RIGHT));
            this.setAlign(JSFlowLayout.RIGHT);
            this.setStyle("border-left", "1px solid darkGray");
            break;
        case JSTabbedPane.TOP:
        default:
            this.setLayout(new JSFlowLayout(JSFlowLayout.NORTH, JSFlowLayout.RIGHT));
            this.setAlign(JSFlowLayout.RIGHT);
            this.setStyle("border-left", "1px solid darkGray");
        }
    }
    getTabPlacement(): string {
        return this.getAttribute("data-tab-placement");
    }
    setTabPlacement(tabPlacement: string) {
        this.setAttribute("data-tab-placement", tabPlacement);
    }
}