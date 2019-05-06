/// <reference path = "../jsuis.ts"/>
/**
 * JSLayeredPane
 * 
 * @author Yassuo Toda
 */
class JSLayeredPane extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(layout: JSLayout);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLDivElement);
            // constructor(layout: JSLayout);
            if (args[0] instanceof HTMLDivElement) {
            } else if (args[0] instanceof JSLayout) {
                var layout: JSLayout = args[0];
                this.setLayout(layout);
            }
            break;
        default:
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