/// <reference path = "../jsuis.ts"/>
/**
 * JSFrame
 * 
 * @author Yassuo Toda
 */
class JSFrame extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        var body: JSBody = JSBody.getInstance();
        body.setContentPane(this);
        this.setLayout(new JSBorderLayout());
        this.setClass("JSFrame");
        this.setStyle("height", "100%");
        this.setVisible(false);
    }
    getMenuBar(): JSMenuBar {
        return this.getData("menuBar");
    }
    setMenuBar(menuBar: JSMenuBar) {
        this.add(menuBar, JSBorderLayout.NORTH, 0);
        this.setData("menuBar", menuBar);
    }
    setVisible(visible: boolean) {
        if (visible) {
            var body: JSBody = JSBody.getInstance();
            body.validate();
        }
        super.setVisible(visible);
    }
    validate(): void {
        var layout: JSLayout = this.getLayout();
        if (layout) {
            layout.layoutContainer(this);
        }
        this.validateChildren();
    }
}