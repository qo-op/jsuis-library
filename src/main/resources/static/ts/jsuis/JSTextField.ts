/// <reference path = "../jsuis.ts"/>
class JSTextField extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLInputElement);
    constructor(columns: number);
    constructor(text: string);
    constructor(text: string, columns: number);
    // overload
    constructor(elementOrColumnsOrText?: HTMLInputElement | number | string, columns?: number) {
        // constructor();
        // constructor(element: HTMLInputElement);
        super(elementOrColumnsOrText === undefined || !(elementOrColumnsOrText instanceof HTMLInputElement) ? document.createElement("input") : elementOrColumnsOrText);
        this.setAttribute("type", "text");
        if (elementOrColumnsOrText !== undefined && !(elementOrColumnsOrText instanceof HTMLInputElement)) {
            if (typeof elementOrColumnsOrText === "number") {
                // constructor(columns: number);
                this.setColumns(elementOrColumnsOrText);
            } else {
                // constructor(text: string);
                // constructor(text: string, columns: number);
                this.setText(elementOrColumnsOrText);
                if (columns !== undefined) {
                    this.setColumns(columns);
                }
            }
        }
    }
    init(): void {
        this.addClass("JSTextField");
    }
    getColumns(): number {
        return +this.getAttribute("size");
    }
    setColumns(columns: number) {
        this.setAttribute("size", "" + columns);
    }
    getText(): string {
        return this.getAttribute("value");
    }
    setText(text: string) {
        this.setAttribute("value", text);
    }
    
}
