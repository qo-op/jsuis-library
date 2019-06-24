/// <reference path = "../jsuis.ts"/>
/**
 * JSScrollPane
 * 
 * @author Yassuo Toda
 */
class JSScrollPane extends JSPanel {
    
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
        this.setUI("JSScrollPane");
        
        this.setLayout(new JSScrollPaneLayout());
        
        var view: JSComponent;
        var vsbPolicy: string = JSScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED;
        var hsbPolicy: string = JSScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED;
        
        switch (args.length) {
        case 1:
            // constructor(view: JSComponent);
            if (args[0] instanceof JSComponent) {
                view = args[0];
            }
            break;
        case 2:
            // constructor(vsbPolicy: string, hsbPolicy: string);
            if (typeof args[0] === "string" && typeof args[1] === "string") {
                vsbPolicy = args[0];
                hsbPolicy = args[1];
            }
            break;
        case 3:
            // constructor(view: JSComponent, vsbPolicy: string, hsbPolicy: string);
            if (args[0] instanceof JSComponent && typeof args[1] === "string" && typeof args[2] === "string") {
                view = args[0];
                vsbPolicy = args[1];
                hsbPolicy = args[2];
                this.setViewportView(view);
            }
            break;
        default:
        }
        
        if (view) {
            this.setViewportView(view);
        }
        this.setVsbPolicy(vsbPolicy);
        this.setHsbPolicy(hsbPolicy);
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
        if (viewportView) {
            this.removeAll();
            this.add(viewportView);
        }
    }
    /*
    getPreferredWidth(): number {
        var preferredWidth: string = this.getAttribute("data-preferred-width");
        if (preferredWidth) {
            return +preferredWidth;
        }
        var viewportView: JSComponent = this.getViewportView();
        if (viewportView) {
            return viewportView.getPreferredWidth();
        } else {
            return 0;
        }
    }
    getPreferredHeight(): number {
        var preferredHeight: string = this.getAttribute("data-preferred-height");
        if (preferredHeight) {
            return +preferredHeight;
        }
        var viewportView: JSComponent = this.getViewportView();
        if (viewportView) {
            return viewportView.getPreferredHeight();
        } else {
            return 0;
        }
    }
    */
}
