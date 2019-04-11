/// <reference path = "../jsuis.ts"/>
/**
 * JSTextField
 * 
 * @author Yassuo Toda
 */
class JSTextField extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLInputElement);
    constructor(columns: number);
    constructor(text: string);
    constructor(text: string, columns: number);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLInputElement) ? document.createElement("input") : args[0]);
        this.setAttribute("type", "text");
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLInputElement);
            // constructor(columns: number);
            // constructor(text: string);
            if (args[0] instanceof HTMLDivElement) {
            } else if (typeof args[0] === "number") {
                var columns: number = args[0];
                this.setColumns(columns);
            } else if (typeof args[0] === "string") {
                var text: string = args[0];
                this.setText(text);
            }
            break;
        case 2:
            // constructor(text: string, columns: number);
            if (typeof args[0] === "string" && typeof args[1] === "number") {
                var text: string = args[0];
                var columns: number = args[1];
                this.setText(text);
                this.setColumns(columns);
            }
            break;
        default:
        }
        this.setClass("JSTextField");
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
