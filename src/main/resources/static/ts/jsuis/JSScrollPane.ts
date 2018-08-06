/// <reference path = "../jsuis.ts"/>
class JSScrollPane extends JSHTMLComponent {
    
    static VERTICAL_SCROLLBAR_AS_NEEDED: string = "auto";
    static VERTICAL_SCROLLBAR_NEVER: string = "hidden";
    static VERTICAL_SCROLLBAR_ALWAYS: string = "scroll";
    
    static HORIZONTAL_SCROLLBAR_AS_NEEDED: string = "auto";
    static HORIZONTAL_SCROLLBAR_NEVER: string = "hidden";
    static HORIZONTAL_SCROLLBAR_ALWAYS: string = "scroll";
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(vsbPolicy: string, hsbPolicy: string);
    constructor(view: JSComponent);
    constructor(view: JSComponent, vsbPolicy: string, hsbPolicy: string);
    // overload
    constructor(elementOrVsbPolicyOrView?: HTMLDivElement | string | JSComponent, hsbPolicyOrVsbPolicy?: string, hsbPolicy?: string) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(elementOrVsbPolicyOrView === undefined || !(elementOrVsbPolicyOrView instanceof HTMLDivElement) ? document.createElement("div") : elementOrVsbPolicyOrView);
        this.setLayout(new JSScrollPaneLayout());
        if (elementOrVsbPolicyOrView !== undefined && !(elementOrVsbPolicyOrView instanceof HTMLDivElement)) {
            if (typeof elementOrVsbPolicyOrView === "string") {
                // constructor(vsbPolicy: string, hsbPolicy: string);
                this.setVsbPolicy(elementOrVsbPolicyOrView);
                this.setHsbPolicy(hsbPolicyOrVsbPolicy);
            } else {
                // constructor(view: JSComponent);
                // constructor(view: JSComponent, vsbPolicy: string, hsbPolicy: string);
                this.setViewportView(elementOrVsbPolicyOrView);
                if (hsbPolicyOrVsbPolicy !== undefined) {
                    this.setVsbPolicy(hsbPolicyOrVsbPolicy);
                    this.setHsbPolicy(hsbPolicy);
                } else {
                    this.setVsbPolicy(JSScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
                    this.setHsbPolicy(JSScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
                }
            }
        }
    }
    init(): void {
        this.addClass("JSScrollPane");
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
            this.addAdjustmentListener(new JSAdjustmentListener(this, {
                adjustmentValueChanged(event: Event) {
                    var table: JSTable = this.getViewportView();
                    table.getTableHeader().setStyle("transform", "translate(0, " + this.element.scrollTop + "px)");
                }
            }));
        }
        this.setData("viewportView", viewportView);
    }
}