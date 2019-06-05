/// <reference path = "../jsuis.ts"/>
/**
 * JSHiddenInput
 * 
 * @author Yassuo Toda
 */
class JSHiddenInput extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(name: string, value: string);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLInputElement) ? document.createElement("input") : args[0]);
        this.setAttribute("type", "hidden");
        switch (args.length) {
        case 2:
            // constructor(name: string, value: string);
            if (typeof args[0] === "string" && typeof args[1] === "string") {
                var name: string = args[0];
                var value: string = args[1];
                this.setName(name);
                this.setValue(value);
            }
            break;
        default:
        }
    }
    init(): void {
        this.addClass("JSHiddenInput");
    }
    getValue(): string {
        return this.getAttribute("value");
    }
    setValue(value: string) {
        this.setAttribute("value", value);
    }
    withValue(value: string) {
        this.setValue(value);
        return this;
    }
}
