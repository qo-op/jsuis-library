/// <reference path = "../jsuis.ts"/>
/**
 * JSScrollPane2
 * 
 * @author Yassuo Toda
 */
class JSScrollPane2 extends JSPanel {
    
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
        this.setVerticalScrollBarPolicy(vsbPolicy);
        this.setHorizontalScrollBarPolicy(hsbPolicy);
    }
    getVerticalScrollBarPolicy(): string {
        return this.getAttribute("data-vertical-scrollbar-policy");
    }
    setVerticalScrollBarPolicy(verticalScrollBarPolicy: string) {
        this.setAttribute("data-vertical-scrollbar-policy", verticalScrollBarPolicy);
        var view: JSComponent = this.getViewportView();
        if (view) {
            view.setStyle("overflow-y", verticalScrollBarPolicy);
        }
    }
    getHorizontalScrollBarPolicy(): string {
        return this.getAttribute("data-horizontal-scrollbar-policy");
    }
    setHorizontalScrollBarPolicy(horizontalScrollBarPolicy: string) {
        this.setAttribute("data-horizontal-scrollbar-policy", horizontalScrollBarPolicy);
        var view: JSComponent = this.getViewportView();
        if (view) {
            view.setStyle("overflow-x", horizontalScrollBarPolicy);
        }
    }
    getViewportView(): JSComponent {
        return this.getData("view");
    }
    setViewportView(view: JSComponent) {
        this.setData("view", view);
        if (view) {
            this.removeAll();
            this.add(view);
            view.setStyle("overflow-y", this.getVerticalScrollBarPolicy());
            view.setStyle("overflow-x", this.getHorizontalScrollBarPolicy());
        }
    }
    /*
    setWidth(width: number) {
        super.setWidth(width);
        var view: JSComponent = this.getViewportView();
        if (view) {
            view.setWidth(width);
        }
    }
    setHeight(height: number) {
        super.setHeight(height);
        var view: JSComponent = this.getViewportView();
        if (view) {
            view.setHeight(height);
        }
    }
    */
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
