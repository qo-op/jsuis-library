/// <reference path = "../jsuis.ts"/>
/**
 * JSHorizontalScrollBar
 * 
 * @author Yassuo Toda
 */
class JSHorizontalScrollBar extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSHorizontalScrollBar");
        
        this.setHsbPolicy(JSHorizontalScrollBar.HORIZONTAL_SCROLLBAR_ALWAYS);
        this.setVsbPolicy(JSHorizontalScrollBar.VERTICAL_SCROLLBAR_NEVER);
        
        var view: JSPanel = this.getView();
        this.setViewportView(view);
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
        return view.getWidth();
    }
    setMaximum(maximum: number) {
        var view: JSPanel = this.getView();
        view.setWidth(maximum);
        view.setHeight(1);
        view.setStyle("margin-top", "-1px");
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
