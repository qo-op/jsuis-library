/// <reference path = "../jsuis.ts"/>
/**
 * JSToolBar
 * 
 * @author Yassuo Toda
 */
class JSToolBar extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSToolBar");
    }
    init(): void {
        this.setLayout(new JSBorderLayout());
    }
    addSeparator(): void {
        var separator = new JSPanel();
        separator.setWidth(8);
        this.add(separator);
    }
    add(component: JSComponent): void;
    add(component: JSComponent, constraints: number | string | { [ key: string ]: number | string }): void;
    add(component: JSComponent, constraints: number | string | { [ key: string ]: number | string }, index: number): void;
    // overload
    add(): void {
        switch (arguments.length) {
        case 1:
            // add(component: JSComponent): void;
            if (arguments[0] instanceof JSComponent) {
                var component: JSComponent = arguments[0];
                super.add(component, JSBorderLayout.WEST);
            }
            break;
        default:
            super.add.apply(this, arguments);
        }
    }
}