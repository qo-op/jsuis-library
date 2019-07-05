/// <reference path = "../jsuis.ts"/>
/**
 * JSProgressBar
 * 
 * @author Yassuo Toda
 */
class JSProgressBar extends JSHTMLComponent {
    
    value: number;
    
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
        switch (arguments.length) {
        case 1:
            // constructor(orientation: string);
            if (typeof arguments[0] === "string") {
                var orientation: string = arguments[0];
                this.setOrientation(orientation);
            }
            break;
        case 2:
            // constructor(min: number, max: number);
            if (typeof arguments[0] === "number" && typeof arguments[1] === "number") {
                var min: number = arguments[0];
                var max: number = arguments[1];
                this.setMin(min);
                this.setMax(max);
            }
            break;
        case 3:
            // constructor(orientation: string, min: number, max: number);
            if (typeof arguments[0] === "string" && typeof arguments[1] === "number" && typeof arguments[2] === "number") {
                var orientation: string = arguments[0];
                var min: number = arguments[1];
                var max: number = arguments[2];
                this.setOrientation(orientation);
                this.setMin(min);
                this.setMax(max);
            }
            break;
        default:
        }
        var bar: JSPanel = this.getBar();
        this.add(bar);
        this.setHeight(14);
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
    getBarContainer(): JSDiv {
        return this.getData("barContainer"); 
    }
    setBarContainer(barContainer: JSDiv) {
        this.setData("barContainer", barContainer);
    }
    getBar(): JSPanel {
        var bar: JSPanel = this.getData("bar");
        if (!bar) {
            bar = new JSPanel();
            bar.setBackground("gray");
            bar.setHeight(12);
            this.setData("bar", bar);
        }
        return bar;
    }
    getValue(): number {
        return this.value;
    }
    setValue(value: number) {
        var barContainer: JSDiv = this.getBarContainer();
        var width: number = barContainer.getContentWidth();
        var bar: JSPanel = this.getBar();
        var min: number = this.getMin();
        var max: number = this.getMax();
        bar.setWidth(width * (value - min) / (max - min));
        this.value = value;
    }
}