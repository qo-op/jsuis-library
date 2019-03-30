/// <reference path = "../jsuis.ts"/>
class JSLayeredPane extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(layout: JSLayout);
    // overload
    constructor(elementOrLayout?: HTMLDivElement | JSLayout) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(elementOrLayout === undefined || !(elementOrLayout instanceof HTMLDivElement) ? document.createElement("div") : elementOrLayout);
        if (elementOrLayout !== undefined && !(elementOrLayout instanceof HTMLDivElement)) {
            // constructor(layout: JSLayout);
            this.setLayout(elementOrLayout);
        }
        var layout = this.getLayout();
        if (!layout) {
            this.setLayout(new JSLayeredPaneLayout());
        }
    }
    init(): void {
        this.addClass("JSLayeredPane");
    }
    setLayer(component: JSComponent, layer: number) {
        component.setZIndex(layer);
    }
}