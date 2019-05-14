/// <reference path = "../jsuis.ts"/>
/**
 * JSOption
 * 
 * @author Yassuo Toda
 */
class JSOption extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLOptionElement);
    constructor(text: string);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLOptionElement);
        super(args.length === 0 || !(args[0] instanceof HTMLOptionElement) ? document.createElement("option") : args[0]);
        switch (args.length) {
        case 1:
            // constructor(text: string);
            if (typeof args[0] === "string") {
                var text: string = args[0];
                this.setText(text);
                this.setValue(text);
            }
            break;
        default:
        }
    }
    init(): void {
        this.addClass("JSOption");
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