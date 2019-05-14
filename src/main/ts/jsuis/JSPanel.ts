/// <reference path = "../jsuis.ts"/>
/**
 * JSPanel
 * 
 * @author Yassuo Toda
 */
class JSPanel extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(layout: JSLayout);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        switch (args.length) {
        case 1:
            // constructor(layout: JSLayout);
            if (args[0] instanceof JSLayout) {
                var layout: JSLayout = args[0];
                this.setLayout(layout);
            }
            break;
        default:
        }
    }
    init(): void {
        this.addClass("JSPanel");
    }
    /*
    getPreferredHeight(): number {
        var preferredHeight: string = this.getAttribute("data-preferred-height");
        if (preferredHeight) {
            return +preferredHeight;
        }
        var layout: JSLayout = this.getLayout();
        if (layout) {
            return layout.preferredLayoutHeight(this);
        }
        var cssHeight: string = this.getStyle("height");
        if (cssHeight) {
            this.removeStyle("height");
        }
        var fontSize: string = this.getStyle("font-size");
        this.setStyle("font-size", "0");
        var height = this.element.getBoundingClientRect().height - this.getBorderTopWidth() - this.getPaddingTop() - this.getPaddingBottom() - this.getBorderBottomWidth();
        this.setStyle("font-size", fontSize);
        if (cssHeight) {
            this.setStyle("height", cssHeight);
        }
        return height;
    }
    */
}