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
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLInputElement) ? document.createElement("input") : arguments[0]);
        this.setAttribute("type", "hidden");
        this.setUI("JSHiddenInput");
        switch (arguments.length) {
        case 2:
            // constructor(name: string, value: string);
            if (typeof arguments[0] === "string" && typeof arguments[1] === "string") {
                var name: string = arguments[0];
                var value: string = arguments[1];
                this.setName(name);
                this.setValue(value);
            }
            break;
        default:
        }
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
