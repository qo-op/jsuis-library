/// <reference path = "../jsuis.ts"/>
/**
 * JSOption
 * 
 * @author Yassuo Toda
 */
class JSOption extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(text: string);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLOptionElement) ? document.createElement("option") : arguments[0]);
        this.setUI("JSOption");
        switch (arguments.length) {
        case 1:
            // constructor(text: string);
            if (typeof arguments[0] === "string") {
                var text: string = arguments[0];
                this.setText(text);
                this.setValue(text);
            }
            break;
        default:
        }
    }
    getText(): string {
        return (<HTMLOptionElement> this.element).text;
    }
    setText(text: string) {
        (<HTMLOptionElement> this.element).text = "" + text;
    }
    getValue(): string {
        return (<HTMLOptionElement> this.element).value;
    }
    setValue(value: string) {
        (<HTMLOptionElement> this.element).value = value;
    }
}