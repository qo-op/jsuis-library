/// <reference path = "../jsuis.ts"/>
/**
 * JSScrollBar
 * 
 * @author Yassuo Toda
 */
class JSScrollBar extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(orientation: string);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setUI("JSScrollBar");
        
        var index: number = 0;
        
        /*
        var viewContainer: JSPanel = this.getViewContainer();
        this.add(viewContainer, null, index++);
        */
        
        var view: JSPanel = this.getView();
        // view.setWidth(0);
        // view.setHeight(0);
        this.setViewportView(view);
        
        var orientation: string;
        
        switch (args.length) {
        case 1:
            // constructor(orientation: string);
            if (typeof args[0] === "string") {
                orientation = args[0];
                this.setOrientation(orientation);
            }
            break;
        default:
        }
        
        if (!orientation) {
            this.setOrientation(JSScrollBar.VERTICAL);
        }
    }
    /*
    getViewContainer(): JSPanel {
        var viewContainer: JSPanel = this.getData("viewContainer");
        if (!viewContainer) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSPanel");
            if (element) {
                viewContainer = new JSPanel(element);
            } else {
                viewContainer = new JSPanel();
            }
            this.setData("viewContainer", viewContainer);
        }
        return viewContainer;
    }
    */
    getOrientation(): string {
        return this.getAttribute("data-orientation");
    }
    setOrientation(orientation: string) {
        this.setAttribute("data-orientation", orientation);
        if (orientation === JSScrollBar.HORIZONTAL) {
            this.setUI("JSHorizontalScrollBar");
            this.setHsbPolicy(JSScrollBar.HORIZONTAL_SCROLLBAR_ALWAYS);
            this.setVsbPolicy(JSScrollBar.VERTICAL_SCROLLBAR_NEVER);
        } else {
            this.setUI("JSVerticalScrollBar");
            this.setVsbPolicy(JSScrollBar.VERTICAL_SCROLLBAR_ALWAYS);
            this.setHsbPolicy(JSScrollBar.HORIZONTAL_SCROLLBAR_NEVER);
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
    getView(): JSPanel {
        var view: JSPanel = this.getData("view");
        if (!view) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSPanel");
            if (element) {
                view = new JSPanel(element);
            } else {
                view = new JSPanel();
            }
            this.setData("view", view);
        }
        return view;
    }
    getViewportView(): JSComponent {
        return this.getData("viewportView");
    }
    setViewportView(viewportView: JSComponent) {
        this.setData("viewportView", viewportView);
        this.removeAll();
        this.add(viewportView);
    }
    getMaximum(): number {
        var view: JSPanel = this.getView();
        var orientation: string = this.getOrientation();
        if (orientation === JSScrollBar.HORIZONTAL) {
            return view.getWidth();
        } else {
            return view.getHeight();
        }
    }
    setMaximum(maximum: number) {
        var view: JSPanel = this.getView();
        var orientation: string = this.getOrientation();
        if (orientation === JSScrollBar.HORIZONTAL) {
            view.setWidth(maximum);
            view.setHeight(1);
            view.setStyle("margin-top", "-1px");
        } else {
            view.setHeight(maximum);
            view.setWidth(1);
            view.setStyle("margin-left", "-1px");
        }
    }
    getPreferredWidth(): number {
        var view: JSPanel = this.getView();
        var display = this.getStyle("display");
        view.setStyle("display", "none");
        var preferredWidth: number = super.getPreferredWidth();
        view.setStyle("display", display);
        return preferredWidth;
    }
    getPreferredHeight(): number {
        var view: JSPanel = this.getView();
        var display = this.getStyle("display");
        view.setStyle("display", "none");
        var preferredHeight: number = super.getPreferredHeight();
        view.setStyle("display", display);
        return preferredHeight;
    }
}
