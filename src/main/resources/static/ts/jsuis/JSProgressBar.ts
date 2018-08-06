/// <reference path = "../jsuis.ts"/>
class JSProgressBar extends JSHTMLComponent {
    
    value: number;
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(min: number, max: number);
    constructor(orientation: string);
    constructor(orientation: string, min: number, max: number);
    // overload
    constructor(elementOrMinOrOrientation?: HTMLDivElement | number | string, maxOrMin?: number, max?: number) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(elementOrMinOrOrientation === undefined || !(elementOrMinOrOrientation instanceof HTMLDivElement) ? document.createElement("div") : elementOrMinOrOrientation);
        if (elementOrMinOrOrientation !== undefined && !(elementOrMinOrOrientation instanceof HTMLDivElement)) {
            if (typeof elementOrMinOrOrientation === "number") {
                // constructor(min: number, max: number);
                this.setMin(elementOrMinOrOrientation);
                this.setMax(maxOrMin);
            } else {
                // constructor(orientation: string);
                // constructor(orientation: string, min: number, max: number);
                this.setOrientation(elementOrMinOrOrientation);
                if (maxOrMin !== undefined) {
                    this.setMin(maxOrMin);
                    this.setMax(max);
                }
            }
        }
        /*
        var barContainer: JSDiv = this.getBarContainer();
        if (!barContainer) {
            barContainer = new JSDiv();
            barContainer.setHeight(16);
            barContainer.setStyle("border", "1px solid gray");
            this.add(barContainer);
            this.setBarContainer(barContainer);
        }
        */
        var bar: JSPanel = this.getBar();
        if (!bar) {
            bar = new JSPanel();
            bar.setBackground("gray");
            bar.setHeight(12);
            this.add(bar);
            this.setBar(bar);
        }
        this.setHeight(14);
        this.setStyle("border", "1px solid gray");
        this.setStyle("white-space", "nowrap");
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
        return this.getData("bar"); 
    }
    setBar(bar: JSPanel) {
        this.setData("bar", bar);
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