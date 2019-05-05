/// <reference path = "../jsuis.ts"/>
/**
 * JSScrollPane
 * 
 * @author Yassuo Toda
 */
class JSScrollPane extends JSHTMLComponent {
    
    static VERTICAL_SCROLLBAR_AS_NEEDED: string = "auto";
    static VERTICAL_SCROLLBAR_NEVER: string = "hidden";
    static VERTICAL_SCROLLBAR_ALWAYS: string = "scroll";
    
    static HORIZONTAL_SCROLLBAR_AS_NEEDED: string = "auto";
    static HORIZONTAL_SCROLLBAR_NEVER: string = "hidden";
    static HORIZONTAL_SCROLLBAR_ALWAYS: string = "scroll";
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(view: JSComponent);
    constructor(vsbPolicy: string, hsbPolicy: string);
    constructor(view: JSComponent, vsbPolicy: string, hsbPolicy: string);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setClass("JSScrollPane");
        this.setLayout(new JSScrollPaneLayout());
        this.setVsbPolicy(JSScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
        this.setHsbPolicy(JSScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLDivElement);
            // constructor(view: JSComponent);
            if (args[0] instanceof HTMLDivElement) {
            } else if (args[0] instanceof JSComponent) {
                var view: JSComponent = args[0];
                this.setViewportView(view);
            }
            break;
        case 2:
            // constructor(vsbPolicy: string, hsbPolicy: string);
            if (typeof args[0] === "string" && typeof args[1] === "string") {
                var vsbPolicy: string = args[0];
                var hsbPolicy: string = args[1];
                this.setVsbPolicy(vsbPolicy);
                this.setHsbPolicy(hsbPolicy);
            }
            break;
        case 3:
            // constructor(view: JSComponent, vsbPolicy: string, hsbPolicy: string);
            if (args[0] instanceof JSComponent && typeof args[1] === "string" && typeof args[2] === "string") {
                var view: JSComponent = args[0];
                var vsbPolicy: string = args[1];
                var hsbPolicy: string = args[2];
                this.setViewportView(view);
                this.setVsbPolicy(vsbPolicy);
                this.setHsbPolicy(hsbPolicy);
            }
            break;
        default:
        }
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
    getViewportView(): JSComponent {
        return this.getData("viewportView");
    }
    setViewportView(viewportView: JSComponent) {
        if (viewportView) {
            this.removeAll();
            this.add(viewportView);
        }
        if (viewportView instanceof JSTable) {
            this.addAdjustmentListener(new JSAdjustmentListener({
                adjustmentValueChanged(event: Event, component: JSScrollPane) {
                    var table: JSTable = <JSTable> component.getViewportView();
                    table.getTableHeader().setStyle("transform", "translate(0, " + component.element.scrollTop + "px)");
                }
            }));
        }
        this.setData("viewportView", viewportView);
    }
}