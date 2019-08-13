/// <reference path = "../jsuis.ts"/>
/**
 * JSProgressBar
 * 
 * @author Yassuo Toda
 */
class JSProgressBar extends JSHTMLComponent {
    
    private value: number;
    private bar: JSPanel;
    
    constructor();
    constructor(element: HTMLElement);
    constructor(orientation: string);
    constructor(min: number, max: number);
    constructor(orientation: string, min: number, max: number);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSProgressBar");
        var orientation: string = JSComponent.HORIZONTAL;
        var min: number = 0;
        var max: number = 100;
        switch (arguments.length) {
        case 1:
            // constructor(orientation: string);
            if (typeof arguments[0] === "string") {
                orientation = arguments[0];
            }
            break;
        case 2:
            // constructor(min: number, max: number);
            if (typeof arguments[0] === "number" && typeof arguments[1] === "number") {
                min = arguments[0];
                max = arguments[1];
            }
            break;
        case 3:
            // constructor(orientation: string, min: number, max: number);
            if (typeof arguments[0] === "string" && typeof arguments[1] === "number" && typeof arguments[2] === "number") {
                orientation = arguments[0];
                min = arguments[1];
                max = arguments[2];
            }
            break;
        default:
        }
        this.setOrientation(orientation);
        this.setMin(min);
        this.setMax(max);
        var bar: JSPanel = this.getBar();
        this.add(bar);
        this.setPreferredWidth(100);
        this.setPreferredHeight(14);
    }
    getOrientation(): string {
        return this.getAttribute("data-orientation");
    }
    setOrientation(orientation: string) {
        this.setAttribute("data-orientation", orientation);
    }
    getMin(): number {
        return +this.getAttribute("data-min");
    }
    setMin(min: number) {
        this.setAttribute("data-min", "" + min);
    }
    getMax(): number {
        return +this.getAttribute("data-max");
    }
    setMax(max: number) {
        this.setAttribute("data-max", "" + max);
    }
    getBar(): JSPanel {
        if (!this.bar) {
            this.bar = new JSPanel();
            this.bar.setBackground("gray");
        }
        return this.bar;
    }
    getValue(): number {
        return this.value;
    }
    setValue(value: number) {
        this.value = value;
        if (this.isValid()) {
            this.revalidate(this);
        }
    }
    validateHorizontally() {
        this.setValidHorizontally(false);
        var width: number = this.getContentWidth();
        var min: number = this.getMin();
        var max: number = this.getMax();
        var value: number = this.getValue();
        width = width * (value - min) / (max - min);
        var bar: JSPanel = this.getBar();
        bar.setWidth(width);
        this.setValidHorizontally(true);
    }
    validateVertically() {
        this.setValidVertically(false);
        var height: number = this.getContentHeight();
        var bar: JSPanel = this.getBar();
        bar.setHeight(height);
        this.setValidVertically(true);
    }
}