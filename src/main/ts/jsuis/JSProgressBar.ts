/// <reference path = "../jsuis.ts"/>
/**
 * JSProgressBar
 * 
 * @author Yassuo Toda
 */
class JSProgressBar extends JSHTMLComponent {
    
    value: number;
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(orientation: string);
    constructor(min: number, max: number);
    constructor(orientation: string, min: number, max: number);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        switch (args.length) {
        case 1:
            // constructor(orientation: string);
            if (typeof args[0] === "string") {
                var orientation: string = args[0];
                this.setOrientation(orientation);
            }
            break;
        case 2:
            // constructor(min: number, max: number);
            if (typeof args[0] === "number" && typeof args[1] === "number") {
                var min: number = args[0];
                var max: number = args[1];
                this.setMin(min);
                this.setMax(max);
            }
            break;
        case 3:
            // constructor(orientation: string, min: number, max: number);
            if (typeof args[0] === "string" && typeof args[1] === "number" && typeof args[2] === "number") {
                var orientation: string = args[0];
                var min: number = args[1];
                var max: number = args[2];
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
    init(): void {
        this.addClass("JSProgressBar");
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
        var width = barContainer.getWidth();
        var bar: JSPanel = this.getBar();
        var min: number = this.getMin();
        var max: number = this.getMax();
        bar.setWidth(width * (value - min) / (max - min));
        this.value = value;
    }
}