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
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSScrollPane");
        
        this.setLayout(new JSScrollPaneLayout());
        
        var view: JSComponent;
        var vsbPolicy: string = JSScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED;
        var hsbPolicy: string = JSScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED;
        
        switch (arguments.length) {
        case 1:
            // constructor(view: JSComponent);
            if (arguments[0] instanceof JSComponent) {
                view = arguments[0];
            }
            break;
        case 2:
            // constructor(vsbPolicy: string, hsbPolicy: string);
            if (typeof arguments[0] === "string" && typeof arguments[1] === "string") {
                vsbPolicy = arguments[0];
                hsbPolicy = arguments[1];
            }
            break;
        case 3:
            // constructor(view: JSComponent, vsbPolicy: string, hsbPolicy: string);
            if (arguments[0] instanceof JSComponent && typeof arguments[1] === "string" && typeof arguments[2] === "string") {
                view = arguments[0];
                vsbPolicy = arguments[1];
                hsbPolicy = arguments[2];
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
    // isValidateRoot(): boolean {
        // return true;
    // }
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
