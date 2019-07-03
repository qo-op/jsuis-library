/// <reference path = "../jsuis.ts"/>
/**
 * JSVerticalScrollBar
 * 
 * @author Yassuo Toda
 */
class JSVerticalScrollBar extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setUI("JSVerticalScrollBar");
        
        this.setVsbPolicy(JSVerticalScrollBar.VERTICAL_SCROLLBAR_ALWAYS);
        this.setHsbPolicy(JSVerticalScrollBar.HORIZONTAL_SCROLLBAR_NEVER);
        
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
        return view.getHeight();
    }
    setMaximum(maximum: number) {
        var view: JSPanel = this.getView();
        view.setHeight(maximum);
        view.setWidth(1);
        view.setStyle("margin-left", "-1px");
    }
    getPreferredWidth(): number {
        var view: JSPanel = this.getView();
        var display = this.getStyle("display");
        view.setStyle("display", "none");
        var preferredWidth: number = super.getPreferredWidth();
        view.setStyle("display", display);
        return preferredWidth;
    }
}
