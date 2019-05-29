/// <reference path = "../jsuis.ts"/>
/**
 * JSScrollPane
 * 
 * @author Yassuo Toda
 */
class JSScrollPane extends JSPanel {
    
    static VERTICAL_SCROLLBAR_AS_NEEDED: string = "auto";
    static VERTICAL_SCROLLBAR_NEVER: string = "hidden";
    static VERTICAL_SCROLLBAR_ALWAYS: string = "scroll";
    
    static HORIZONTAL_SCROLLBAR_AS_NEEDED: string = "auto";
    static HORIZONTAL_SCROLLBAR_NEVER: string = "hidden";
    static HORIZONTAL_SCROLLBAR_ALWAYS: string = "scroll";
    
    constructor();
    constructor(element: HTMLElement);
    constructor(view: JSComponent);
    constructor(vsbPolicy: string, hsbPolicy: string);
    constructor(view: JSComponent, vsbPolicy: string, hsbPolicy: string);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        var viewContainer: JSPanel = this.getViewContainer();
        this.add(viewContainer);
        this.setVsbPolicy(JSScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
        this.setHsbPolicy(JSScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
        switch (args.length) {
        case 1:
            // constructor(view: JSComponent);
            if (args[0] instanceof JSComponent) {
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
    init(): void {
        this.addClass("JSScrollPane");
    }
    getViewContainer(): JSScrollPaneViewContainer {
        var viewContainer: JSScrollPaneViewContainer = this.getData("viewContainer");
        if (!viewContainer) {
            viewContainer = new JSScrollPaneViewContainer();
            this.setData("viewContainer", viewContainer);
        }
        return viewContainer;
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
        this.setData("viewportView", viewportView);
        var viewContainer: JSPanel = this.getViewContainer();
        if (viewportView) {
            viewContainer.removeAll();
            viewContainer.add(viewportView);
        }
        if (viewportView instanceof JSTable) {
            /*
            this.addAdjustmentListener({
                adjustmentValueChanged(event: Event, scrollPane: JSScrollPane) {
                    var table: JSTable = <JSTable> scrollPane.getViewportView();
                    table.getTableHeader().setStyle("transform", "translate(0, " + scrollPane.element.scrollTop + "px)");
                }
            }).withParameters(this);
            */
        }
    }
    getPreferredWidth(): number {
        var preferredWidth: string = this.getAttribute("data-preferred-width");
        if (preferredWidth) {
            return +preferredWidth;
        }
        var viewContainer: JSPanel = this.getViewContainer();
        return viewContainer.getPreferredWidth();
    }
    getPreferredHeight(): number {
        var preferredHeight: string = this.getAttribute("data-preferred-height");
        if (preferredHeight) {
            return +preferredHeight;
        }
        var viewContainer: JSPanel = this.getViewContainer();
        return viewContainer.getPreferredHeight();
    }
}